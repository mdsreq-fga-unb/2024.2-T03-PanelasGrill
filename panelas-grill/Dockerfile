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

# **Adicionando a etapa de build**
RUN npm run build

# Expondo a porta do Next.js
EXPOSE 3000

# **Alterando o comando para rodar a versão de produção**
CMD ["npm", "run", "start"]