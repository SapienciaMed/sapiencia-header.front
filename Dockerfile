FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build:webpack
EXPOSE 9001
CMD ["npm", "run", "start"]