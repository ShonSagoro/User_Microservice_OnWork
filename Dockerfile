FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install ts-node --save-dev
RUN npm install typescript -g 
RUN npm install typescript --save-dev

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
