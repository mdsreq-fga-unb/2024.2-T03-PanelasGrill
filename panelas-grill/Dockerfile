# Usando Node.js como base
FROM node:20

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando arquivos para dentro do container
COPY package.json package-lock.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante dos arquivos
COPY . .

# Construindo a aplicação
RUN npm run build

# Expondo a porta do React
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]

