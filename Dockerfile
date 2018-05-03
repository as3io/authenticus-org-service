FROM node:8

WORKDIR /app
COPY . /app

EXPOSE 8674
EXPOSE 2122

ENV NODE_ENV production
ENTRYPOINT ["node", "src/index.js"]
