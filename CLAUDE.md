# CLAUDE.md: Innovations UI Kit

## Project
A React + TypeScript component library for Innovations Lab apps, built with Vite and documented in Storybook.
Product context: `docs/product-brief.md`. Design specs and open questions: `docs/ux-handoff.md`.
The UX spec defines behaviour; Figma (if shared) defines visuals.

## Commands
- `npm run lint`: ESLint
- `npm run typecheck`: `tsc --noEmit`
- `npm run test`: Vitest + React Testing Library
- `npm run build`: library build with Vite
- `npm run storybook` / `npm run build-storybook`: Storybook dev server / static build

Run `lint`, `typecheck` and `test` after every change. Work is not done until all three pass.

## Structure
```
src/
  tokens/              # design tokens (CSS custom properties + TS exports)
  components/
    Button/
      Button.tsx
      Button.module.css
      Button.test.tsx
      Button.stories.tsx
      index.ts
  index.ts             # public entry point; export every component here
docs/                  # product, UX and planning docs
```

## Conventions
- **Components:** function components, PascalCase folder and file names, named exports only (no default exports).
- **Props:** export a `<Component>Props` interface; extend native element props where it fits (e.g. `ButtonHTMLAttributes`); forward refs on interactive components.
- **TypeScript:** strict mode; no `any`, no non-null assertions (`!`) without a comment explaining why.
- **Styling:** CSS Modules. Use semantic tokens only (`var(--color-action-primary)`, `var(--space-4)`); never hard-code hex colours, pixel spacing, font sizes or shadows, and never use primitive tokens (`blue-500`) inside components. This keeps a future dark theme possible without changing components.
- **Variants and sizes:** use the exact names from the UX spec (`primary`, `secondary`, `ghost`, `danger`; `sm`, `md`, `lg`).
- **Accessibility (WCAG 2.1 AA):** semantic HTML first; keyboard operable; focus ring on `:focus-visible` only; label every input; set `aria-invalid`, `aria-describedby`, `aria-busy` where relevant; respect `prefers-reduced-motion`.
- **Content:** sentence case for labels and buttons ("Save changes"); error messages say what to do.
- **Tests:** test behaviour, not implementation; query by role/label; cover each state and keyboard interaction.
- **Stories:** one story per variant and per state listed in `docs/ux-handoff.md`.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).

## Working rules for Claude
- Start non-trivial changes in plan mode and wait for approval before editing.
- Keep changes small; show diffs and do not touch unrelated files.
- Do not add new dependencies without asking.
- Do not invent APIs. If unsure whether a React, Storybook, Vitest or Testing Library API exists, check the installed version or say so.
- Where the spec is TBD (see the questions in `docs/ux-handoff.md`), ask instead of guessing.
- Never read, print or commit secrets (`.env`, tokens, keys).