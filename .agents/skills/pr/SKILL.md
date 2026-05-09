---
name: pr
description: Draft a pull request body for this project only when explicitly invoked with /pr or $pr.
---

# PR

Use only when the user explicitly invokes `/pr` or `$pr`.

## Inputs

- Use the user's invocation message as the source of the `main change`.
- If the user does not provide a main change, ask for it before drafting.

## Workflow

1. Read the pull request template under the repository `.github` directory and preserve its headings, comments, and overall shape.
2. Inspect git history and local changes with commands such as `git status`, `git diff --stat`, focused `git diff`, and recent commits.
3. Infer PR content from commits and diffs, but do not invent details that are not supported by the repository context.
4. Fill the existing PR template instead of replacing it with a new template.

## Writing Rules

- Use `main change` and `additional change` subsections inside the template description area.
- Write `main change` as concise one-line bullets based on the user's main change and confirmed git context.
- Write `additional change` as concise one-line bullets for changes outside the main change.
- When a function or class is implemented or modified, include its name in the relevant bullet.
- Write bullets in short Korean noun phrases.
- Keep the PR body ready to paste.
