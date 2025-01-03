# Build stage for frontend
FROM node:18 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./   

COPY . ./  

RUN npm install

RUN npm run build

FROM nginx:alpine AS production-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html  

#COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
