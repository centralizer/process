###################
# DEVELOPMENT
###################

FROM node:alpine as development 

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

###################
# PRODUCTION
###################

FROM node:alpine as production 

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node package-lock.json ./

RUN npm ci --only=prod

COPY --chown=node:node . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]