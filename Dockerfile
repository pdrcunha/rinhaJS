# Use a imagem oficial do Node.js
FROM node:20.10

# Crie e defina o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar o rollback seguido de migrate antes de iniciar a aplicação
 CMD npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npm start
# CMD ["npm", "start"]
