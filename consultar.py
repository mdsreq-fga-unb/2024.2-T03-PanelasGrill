from pymongo import MongoClient
from pymongo.server_api import ServerApi
from mongo_features import conectar_mongo, consultar_documentos


# Conectar ao MongoDB
client = conectar_mongo()
if client:
    db = client["estoques"]
    collection = db["produtos"]
    
    # Chamar a função consultar_documentos
    consultar_documentos(collection)