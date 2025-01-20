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
    allow_methods=["GET", "POST", "PUT"],  # Inclua o método PUT
    allow_headers=["*"],  # Permita todos os cabeçalhos
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

@app.get("/consultar")
def consultar_documentos():
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        documentos = list(collection.find({}, {"_id": 1, "item": 1, "tipo": 1, "quantidade": 1, "referencia_quantidade": 1}))
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