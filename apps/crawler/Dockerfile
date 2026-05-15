# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable

WORKDIR /repo

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/crawler/package.json apps/crawler/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json

RUN pnpm install --filter crawler --frozen-lockfile

FROM deps AS build

COPY apps/crawler apps/crawler
COPY packages/eslint-config packages/eslint-config

RUN pnpm --filter crawler build
RUN pnpm --filter crawler deploy --prod --legacy /prod/crawler
RUN cp -r apps/crawler/dist /prod/crawler/dist

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV="production"

WORKDIR /app

COPY --from=build /prod/crawler ./

EXPOSE 3200

CMD ["node", "dist/src/main.js"]
