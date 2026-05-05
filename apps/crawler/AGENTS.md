# AGENTS.md

## Mandatory Rules

- Do not make changes outside the requested scope.
- When adding or modifying a function or method, write a JSDoc comment, except for trivial getters/setters or self-explanatory methods.
- Write code comments in Korean.
- Avoid temporary or brittle fixes that bypass the original logic.
- Do not use monkey patching unless explicitly requested.

## Preferred Conventions

- Minimize changes to existing logic.
- For non-method functions, use arrow functions if possible.

## Code change workflow

- If code changes are made, run `pnpm lint`.
