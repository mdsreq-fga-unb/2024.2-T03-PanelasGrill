from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from typing import List, Dict
from bson import ObjectId
from pydantic import BaseModel

app = FastAPI()

# Adicionando o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adicione outros domínios, se necessário
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
    quantidade: int
    referencia_quantidade: str

class IngredienteModel(BaseModel):
    item_estoque_id: str
    quantidade: float
    referencia_quantidade: str

class CardapioModel(BaseModel):
    nome: str
    ingredientes: List[IngredienteModel]


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
        result = collection.delete_one({"_id": ObjectId(item_id)})
        if result.deleted_count > 0:
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
        result = cardapio_collection.insert_one(cardapio.dict())
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
        result = cardapio_collection.update_one(
            {"_id": ObjectId(cardapio_id)},
            {"$set": updated_cardapio.dict()},
            upsert=False
        )
        if result.matched_count > 0:
            return {"status": "success", "message": "Cardápio atualizado com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Cardápio com ID {cardapio_id} não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao editar cardápio: {e}")

@app.post("/cardapio/preparar/{cardapio_id}")
def preparar_cardapio(cardapio_id:str, quantidade_pratos: int):
    try:
        print(f"Cardapio ID: {cardapio_id}, Quantidade de Pratos: {quantidade_pratos}")
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
        print(f"Tentando excluir cardápio com ID: {cardapio_id}")  # Log para depuração
        client = conectar_mongo()
        db = client["estoques"]
        cardapio_collection = db["cardapios"]
        result = cardapio_collection.delete_one({"_id": ObjectId(cardapio_id)})
        print(f"Resultado da exclusão: {result.raw_result}")  # Log para depuração
        if result.deleted_count > 0:
            return {"status": "success", "message": "Cardápio excluido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail=f"Cardápio com ID {cardapio_id} não encontrado")
    except Exception as e:
        print(f"Erro ao excluir cardápio: {e}")  # Log para depuração
        raise HTTPException(status_code=500, detail=f"Erro ao excluir cardápio: {e}")