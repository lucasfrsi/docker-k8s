# FROM node:alpine as builder
FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
 
FROM nginx
# Port that gets mapped for incoming traffic
# It does nothing locally, but Elastic Beanstalk looks at this
EXPOSE 80
# COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=0 /app/build /usr/share/nginx/html