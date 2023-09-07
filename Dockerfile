FROM node:18-alpine

COPY . .

RUN npm install && npm run build

CMD [ "node", "dist/main.js" ]
