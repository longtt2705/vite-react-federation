FROM node:16-alpine AS build-stage

WORKDIR /app

COPY ./ ./

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:1.23
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf