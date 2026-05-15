# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable

WORKDIR /repo

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json

RUN pnpm install --filter api --frozen-lockfile

FROM deps AS build

COPY apps/api apps/api
COPY packages/eslint-config packages/eslint-config

RUN pnpm --filter api build
RUN pnpm --filter api deploy --prod --legacy /prod/api
RUN cp -r apps/api/dist /prod/api/dist

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV="production"

WORKDIR /app

COPY --from=build /prod/api ./

EXPOSE 3001

CMD ["node", "dist/src/main.js"]
