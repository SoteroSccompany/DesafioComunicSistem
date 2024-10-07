# Use uma imagem base do Node.js
FROM node:latest

# Cria um diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código da aplicação
COPY . .

# Exponha a porta que o servidor irá usar
EXPOSE 8081

# Comando para rodar a aplicação
CMD ["node", "index.js"]
