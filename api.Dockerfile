FROM node:18

WORKDIR /app
COPY dist/apps/api ./
COPY node_modules ./node_modules

EXPOSE 3333

CMD ["node", "main.js"]
