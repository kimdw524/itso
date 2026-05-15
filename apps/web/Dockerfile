# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable

WORKDIR /repo

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/postcss-hover-fallback/package.json packages/postcss-hover-fallback/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json

RUN pnpm install --filter web --frozen-lockfile

FROM deps AS build

COPY apps/web apps/web
COPY packages/eslint-config packages/eslint-config
COPY packages/postcss-hover-fallback packages/postcss-hover-fallback
COPY packages/typescript-config packages/typescript-config

RUN --mount=type=secret,id=web_env \
  cp /run/secrets/web_env apps/web/.env && \
  pnpm --filter web build && \
  rm apps/web/.env

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV="production"
ENV HOSTNAME="0.0.0.0"
ENV PORT="3000"

WORKDIR /app

COPY --from=build /repo/apps/web/.next/standalone ./
COPY --from=build /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /repo/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
