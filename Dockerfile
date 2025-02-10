# Usa a imagem do Python
FROM python:3.12

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do backend para o contêiner
COPY . .

# Define o PYTHONPATH para garantir que os pacotes sejam encontrados
# REMOVE O PYTHONPATH POIS O MODULO ESTÁ NA RAIZ
#ENV PYTHONPATH="/app/src"

# Instala as dependências do FastAPI
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta do FastAPI (por padrão, 8000)
EXPOSE 8000

# Comando para rodar o FastAPI no Uvicorn
# ALTERADO PARA O NOVO LOCAL
CMD ["uvicorn", "mongo_api:app", "--host", "0.0.0.0", "--port", "8000"]