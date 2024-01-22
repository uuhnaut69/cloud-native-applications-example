###################
# DEVELOPMENT
###################

FROM node:21-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

RUN yarn install --frozen-lockfile --ignore-scripts

COPY --chown=node:node . .

USER node

###################
# BUILD PRODUCTION
###################

FROM node:21-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

RUN yarn install --no-lockfile --ignore-scripts --production && yarn cache clean

USER node

# ###################
# PRODUCTION
# ###################

FROM node:21-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

USER node

CMD [ "node", "dist/main" ]
