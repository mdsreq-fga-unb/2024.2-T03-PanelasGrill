from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from typing import List, Dict
from bson import ObjectId
from pydantic import BaseModel
from datetime import datetime
from datetime import datetime

app = FastAPI()

# Adicionando o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://2024-2-t03-panelas-grill.vercel.app"],  # Adicione outros domínios, se necessário
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Incluir o método DELETE
    allow_headers=["*"],
)

CONNECTION_STRING = "mongodb+srv://romuloreis:y3H6bsXl0kWV7XsS@cluster0.3n2im.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = None

def conectar_mongo():
    global client
    if client is None:
        client = MongoClient(CONNECTION_STRING, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        return client
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao conectar ao MongoDB: {e}")


class ItemModel(BaseModel):
    item: str
    tipo: str
    quantidade: float  # Alterado para aceitar float
    referencia_quantidade: str

class IngredienteModel(BaseModel):
    item_estoque_id: str
    quantidade: float
    referencia_quantidade: str

class CardapioModel(BaseModel):
    nome: str
    ingredientes: List[IngredienteModel]


def registrar_transacao(tipo: str, detalhes: Dict):
    client = conectar_mongo()
    db = client["estoques"]
    transacoes_collection = db["transacoes"]
    transacao = {
        "tipo": tipo,
        **detalhes,
        "quantidade": detalhes.get("quantidade", "N/A"),
        "data": datetime.now()
    }
    transacoes_collection.insert_one(transacao)


@app.get("/consultar")
def consultar_documentos():
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        documentos = list(
            collection.find({}, {"_id": 1, "item": 1, "tipo": 1, "quantidade": 1, "referencia_quantidade": 1}))
        for doc in documentos:
            doc["_id"] = str(doc["_id"])
        return {"status": "success", "data": documentos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar documentos: {e}")


@app.post("/inserir")
def inserir_documentos(documents: List[ItemModel]):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        for doc in documents:
            collection.update_one({"item": doc.item}, {"$set": doc.dict()}, upsert=True)
            registrar_transacao("entrada_produto", {"produto": doc.dict(), "quantidade": doc.quantidade})
        return {"status": "success", "message": "Documentos inseridos ou atualizados com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao inserir documentos: {e}")


@app.put("/editar/{item_id}")
def atualizar_documentos(item_id: str, updated_item: ItemModel):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        result = collection.update_one(
            {"_id": ObjectId(item_id)},
            {"$set": updated_item.dict()},
            upsert=False
        )
        if result.matched_count > 0:
            registrar_transacao("edicao_produto", {"item_id": item_id, "produto": updated_item.dict(), "quantidade": updated_item.quantidade})
            return {"status": "success", "message": "Documento atualizado com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Documento com ID {item_id} não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar documento: {e}")

@app.delete("/excluir/{item_id}")
def excluir_documentos(item_id: str):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        produto = collection.find_one({"_id": ObjectId(item_id)})
        result = collection.delete_one({"_id": ObjectId(item_id)})
        if result.deleted_count > 0:
            registrar_transacao("saida_produto", {"item_id": item_id, "produto": produto, "quantidade": produto.get("quantidade", 0)})
            return {"status": "success", "message": "Documento excluido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Documento com ID {item_id} não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao excluir documento: {e}")

@app.post("/cardapio")
def criar_cardapio(cardapio: CardapioModel):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        cardapio_collection = db["cardapios"]
        cardapio_dict = cardapio.dict()
        cardapio_dict['ingredientes'] = [ingrediente.dict() for ingrediente in cardapio.ingredientes]
        result = cardapio_collection.insert_one(cardapio_dict)
        registrar_transacao("criacao_cardapio", {"cardapio_nome": cardapio.nome, "ingredientes": cardapio_dict["ingredientes"]})
        return {"status": "success", "message": "Cardápio criado com sucesso", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar cardápio: {e}")

@app.get("/cardapio")
def consultar_cardapios():
    try:
        client = conectar_mongo()
        db = client["estoques"]
        cardapio_collection = db["cardapios"]
        documentos = list(cardapio_collection.find())
        for doc in documentos:
            doc["_id"] = str(doc["_id"])
        return {"status": "success", "data": documentos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar cardápios: {e}")

@app.put("/cardapio/{cardapio_id}")
def editar_cardapio(cardapio_id: str, updated_cardapio: CardapioModel):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        cardapio_collection = db["cardapios"]
        updated_cardapio_dict = updated_cardapio.dict()
        updated_cardapio_dict['ingredientes'] = [ingrediente.dict() for ingrediente in updated_cardapio.ingredientes]
        result = cardapio_collection.update_one(
            {"_id": ObjectId(cardapio_id)},
            {"$set": updated_cardapio_dict},
            upsert=False
        )
        if result.matched_count > 0:
            registrar_transacao("edicao_cardapio", {"cardapio_id": cardapio_id, "cardapio": updated_cardapio_dict})
            return {"status": "success", "message": "Cardápio atualizado com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Cardápio com ID {cardapio_id} não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao editar cardápio: {e}")

@app.post("/cardapio/preparar/{cardapio_id}")
def preparar_cardapio(cardapio_id:str, quantidade_pratos: int):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        cardapio_collection = db["cardapios"]
        estoque_collection = db["produtos"]
        cardapio = cardapio_collection.find_one({"_id": ObjectId(cardapio_id)})
        if cardapio:
            for ingrediente in cardapio["ingredientes"]:
                item_estoque = estoque_collection.find_one({"_id": ObjectId(ingrediente["item_estoque_id"])})
                if not item_estoque:
                    raise HTTPException(status_code=404, detail=f"Item de estoque com ID {ingrediente['item_estoque_id']} não encontrado")
                if item_estoque["referencia_quantidade"] != ingrediente["referencia_quantidade"]:
                    raise HTTPException(status_code=400, detail=f"Unidade de medida do ingrediente {item_estoque['item']} não corresponde a unidade de medida do estoque {item_estoque['referencia_quantidade']}")
                quantidade_necessaria = ingrediente["quantidade"] * quantidade_pratos
                if item_estoque["quantidade"] < quantidade_necessaria:
                    raise HTTPException(status_code=400, detail=f"Quantidade insuficiente do ingrediente {item_estoque['item']} no estoque")
                estoque_collection.update_one(
                    {"_id": ObjectId(ingrediente["item_estoque_id"])},
                    {"$inc": {"quantidade": -quantidade_necessaria}}
                )
            registrar_transacao("preparacao_cardapio", {"cardapio_id": cardapio_id, "quantidade_pratos": quantidade_pratos})
            return {"status": "success", "message": "Cardápio preparado com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Cardápio com ID {cardapio_id} não encontrado")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao preparar cardápio: {e}")

@app.delete("/cardapio/{cardapio_id}")
def excluir_cardapio(cardapio_id: str):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        cardapio_collection = db["cardapios"]
        cardapio = cardapio_collection.find_one({"_id": ObjectId(cardapio_id)})
        result = cardapio_collection.delete_one({"_id": ObjectId(cardapio_id)})
        if result.deleted_count > 0:
            registrar_transacao("exclusao_cardapio", {"cardapio_nome": cardapio["nome"], "ingredientes": cardapio.get("ingredientes", [])})
            return {"status": "success", "message": "Cardápio excluido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Cardápio com ID {cardapio_id} não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao excluir cardápio: {e}")

# Função para converter ObjectId e datetime recursivamente
def converter_objetos(documento):
    if isinstance(documento, list):
        return [converter_objetos(item) for item in documento]
    elif isinstance(documento, dict):
        return {chave: converter_objetos(valor) for chave, valor in documento.items()}
    elif isinstance(documento, ObjectId):
        return str(documento)
    elif isinstance(documento, datetime):
        return documento.isoformat()
    else:
        return documento

@app.get("/transacoes")
def consultar_transacoes():
    try:
        client = conectar_mongo()
        db = client["estoques"]
        transacoes_collection = db["transacoes"]
        transacoes = list(transacoes_collection.find())

        # Aplicar a conversão para cada transação
        transacoes_convertidas = [converter_objetos(transacao) for transacao in transacoes]

        return {"status": "success", "data": transacoes_convertidas}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar transações: {e}")
