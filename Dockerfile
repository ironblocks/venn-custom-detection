FROM node:18.14.2 as build

WORKDIR /app

COPY . ./
RUN npm install && npm run build

FROM node:18.14.2-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
ENTRYPOINT [ "node", "/app/dist/src/app.js" ]