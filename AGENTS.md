# AGENT Guide - vo-utils

## Project Purpose
`vo-utils` contains shared npm packages used by multiple VO-College projects (including `vo-admin` and `vo-validig`).

Packages in this repository:
- `packages/app`: shared logic (for example authentication and app-level utilities)
- `packages/components`: shared React UI components (for example forms/buttons)
- `packages/theme`: shared MUI theme definitions

## Monorepo Workflow
- Build from repo root with `./build.sh`.
- Build specific package with `./build.sh app` (or `components`, `theme`).
- Package-level builds exist in each package `package.json`.

## Publishing and Local Linking
- yalc flow (local integration): `npm run build && yalc push --replace --sig`
- npm publish flow: `npm publish --access public`

Use yalc when validating changes in consumer apps (for example `vo-admin`) before publishing.

## Dependency/Compatibility Rules
- `components` depends on theme and app-level contracts.
- Keep peer dependencies aligned with consumer expectations (`vo-admin`, `vo-validig`, etc).
- Avoid unnecessary major dependency shifts unless explicitly requested.

## Recommended Change Process
1. Implement changes in the correct package scope.
2. Build the changed package.
3. Push via yalc.
4. Link/update in consumer app(s) and verify usage.
5. Only then publish to npm if required.

## Code Conventions For Agents
- Keep shared APIs stable and backwards compatible where possible.
- Prefer additive exports over breaking renames/removals.
- Update typings when changing public component/utility APIs.
- Keep package boundaries clear; avoid circular dependencies.

## Validation Checklist
After non-trivial shared changes:
1. Build changed package(s).
2. Validate usage in at least one consumer app (commonly `vo-admin`).
3. Confirm no regression in package dist output.
