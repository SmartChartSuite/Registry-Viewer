FROM node:14.20.0-slim AS build
WORKDIR /app
COPY . .

# Set BASE_HREF
ARG BASE_HREF=/
RUN npm config set strict-ssl false
RUN npm install -g npm --no-package-lock
RUN npm install --no-package-lock
RUN npm run build -- --base-href $BASE_HREF

# stage 2

FROM nginx
COPY --from=build /app/dist/smart-pacer-registry-viewer /usr/share/nginx/html/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
