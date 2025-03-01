###################
# BUILD FOR PRODUCTION
###################
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i --frozen-lockfile

COPY . .

RUN pnpm run build

ENV NODE_ENV=production

RUN pnpm i --prod

###################
# PRODUCTION
###################
FROM gcr.io/distroless/nodejs22-debian12 AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production

CMD [ "dist/main.js" ]