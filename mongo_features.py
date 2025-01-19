from pymongo import MongoClient
from pymongo.server_api import ServerApi

# String de conexão
CONNECTION_STRING = "mongodb+srv://romuloreis:y3H6bsXl0kWV7XsS@cluster0.3n2im.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Conexão inicial com o MongoDB
def conectar_mongo():
    """
    Conecta ao MongoDB e verifica a conexão com um ping.
    """
    client = MongoClient(CONNECTION_STRING, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client
    except Exception as e:
        print(f"Erro ao conectar: {e}")
        return None

# Função para limpar a coleção
def limpar_colecao(collection):
    """
    Limpa todos os documentos de uma coleção.
    
    :param collection: A coleção a ser limpa.
    """
    collection.delete_many({})
    print("Coleção limpa com sucesso!")

# Função para inserir ou atualizar documentos
def inserir_ou_atualizar_documentos(collection, documents):
    """
    Insere ou atualiza documentos na coleção, evitando duplicidade.
    
    :param collection: A coleção onde os documentos serão inseridos/atualizados.
    :param documents: Lista de documentos a serem inseridos/atualizados.
    """
    for doc in documents:
        collection.update_one(
            {"item": doc["item"]},  # Filtro: busca por item existente
            {"$set": doc},          # Atualiza os campos com os novos valores
            upsert=True             # Insere se o documento não existir
        )
    print("Documentos inseridos ou atualizados com sucesso!")

# Função para consultar documentos na coleção
def consultar_documentos(collection):
    """
    Consulta e exibe todos os documentos de uma coleção.
    
    :param collection: A coleção a ser consultada.
    """
    print("\nDocumentos na coleção:")
    for doc in collection.find():
        print(doc)

# Função para editar um item específico
def editar_item(collection, item_name, novos_valores):
    """
    Edita um item existente na coleção com base no nome do item.
    
    :param collection: A coleção onde o item está localizado.
    :param item_name: Nome do item a ser editado.
    :param novos_valores: Dicionário com os campos e valores a serem atualizados.
    """
    resultado = collection.update_one(
        {"item": item_name},    # Filtro: encontra pelo nome do item
        {"$set": novos_valores} # Atualiza os campos fornecidos
    )
    
    if resultado.matched_count > 0:
        print(f"Item '{item_name}' atualizado com sucesso!")
    else:
        print(f"Item '{item_name}' não encontrado.")

# Integração com o MongoDB
if __name__ == "__main__":
    # Conectar ao MongoDB
    client = conectar_mongo()
    if client:
        db = client["estoques"]
        collection = db["produtos"]
        
        # Exemplo de limpeza da coleção
        # limpar_colecao(collection)
        
        # Exemplo de inserção/atualização de documentos
        documentos = [
            {"item": "feijao", "tipo": "carioca", "referencia_quantidade": "kg", "quantidade": 20},
            {"item": "arroz", "tipo": "branco", "referencia_quantidade": "kg", "quantidade": 20},
            {"item": "alho", "tipo": "comum", "referencia_quantidade": "unidade", "quantidade": 15},
            {"item": "óleo", "tipo": "soja", "referencia_quantidade": "lts", "quantidade": 10}
        ]
        inserir_ou_atualizar_documentos(collection, documentos)
        
        # Exemplo de consulta de documentos
        consultar_documentos(collection)
        
        # Exemplo de edição de um item
        editar_item(collection, "feijao", {"quantidade": 25, "tipo": "preto"})
        
        # Consultando após a edição
        consultar_documentos(collection)
