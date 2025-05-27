FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build
RUN npm install -g serve

# serve.json을 dist 안으로
COPY serve.json ./dist/serve.json

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]