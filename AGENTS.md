# Zeaks Admin

This project is a backend management system built with Vue 3 + TypeScript + Composition API, developed using modern frontend toolchain (Vite/pnpm).

## Basic Info

- I'm using Ubuntu for development
- Communication in Chinese, code and comments uniformly use English

## Build/Test/Lint Commands

```bash
pnpm install      # Install project dependencies
pnpm dev          # Start development server
pnpm build        # Build production version
pnpm test:unit    # Run unit tests
pnpm type-check   # Run type checking
pnpm lint         # Code quality check
```

## Code Style Guidelines

- Use Linux-style line endings in source code
- Use single quotes, no semicolons by default (add only when necessary)
- Don't prematurely extract single-line code (under 100 characters) into separate functions unless it appears more than 2 times
- Components/Pages: kebab-case (e.g., `user-profile.tsx`, `user-page.tsx`)
- Utilities/Utility functions: kebab-case (e.g., `data-formatter.ts`)

## Formatting

- Do not reformat existing code unless I specifically request formatting of existing code

## Committing

- ALWAYS use semantic commits (fix:, feat:, chore:, refactor:, docs:).
