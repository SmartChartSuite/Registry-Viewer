FROM node:alpine AS build
WORKDIR /app
COPY . .

# Set BASE_HREF
ARG BASE_HREF
RUN npm ci && npm run build -- --base-href $BASE_HREF

# stage 2

FROM nginx:alpine
COPY --from=build /app/dist/smart-pacer-registry-viewer /usr/share/nginx/html/smart-pacer-registry-viewer/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
