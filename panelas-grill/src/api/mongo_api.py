from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from typing import List

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

@app.get("/consultar")
def consultar_documentos():
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        documentos = list(collection.find({}, {"_id": 0}))
        return {"status": "success", "data": documentos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar documentos: {e}")

@app.post("/inserir")
def inserir_documentos(documents: List[dict]):
    try:
        client = conectar_mongo()
        db = client["estoques"]
        collection = db["produtos"]
        for doc in documents:
            collection.update_one({"item": doc["item"]}, {"$set": doc}, upsert=True)
        return {"status": "success", "message": "Documentos inseridos ou atualizados com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao inserir documentos: {e}")
