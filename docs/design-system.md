# Design System: Innovations UI Kit

## Layers

Each layer may depend only on the layers below it.

| Layer | What it is | Lives in |
|---|---|---|
| Foundations | Decisions and principles: colour, type, spacing, motion, WCAG 2.1 AA | `docs/ux-handoff.md` |
| Tokens | Foundations as named CSS custom properties. Primitive (`--blue-500`) hold raw values; semantic (`--color-action-primary`) give them a role. | `src/tokens/` |
| Primitives | Low-level building blocks with no product opinion (e.g. a visually-hidden helper). Empty today. | None yet |
| Components | Reusable UI with a stable API: variants, sizes, states, ref forwarding. Uses semantic tokens only. | `src/components/<Name>/` |
| Patterns | Combinations of components that solve a user problem (e.g. a form with validation). None yet. | None yet |
| Documentation | Storybook stories for every variant and state | `*.stories.tsx` |
| Governance | Who decides, what must pass, how change is handled | This document |

Rules:
- Components use semantic tokens only: no primitives, hex colours or hard-coded spacing.
- Patterns use components only through their public API.
- Everything public is exported from `src/index.ts`.

## Contribution model

1. **Check first.** Look for an existing component or an open proposal. Prefer adding a variant over a new component.
2. **Propose.** Write the component's API (props, variants, states) and get it reviewed before building.
3. **Resolve the spec.** Behaviour comes from the UX spec. If it is TBD, ask UX and record the answer. Do not guess.
4. **Build** in a small pull request with a Conventional Commit message.
5. **Review** the pull request against the Definition of Done below.

**Definition of Done**
- [ ] `lint`, `typecheck` and `test` pass
- [ ] a story for every variant and state in the UX spec
- [ ] accessible: keyboard operable, `:focus-visible` ring, labelled inputs
- [ ] no hard-coded colours or primitive tokens
- [ ] exported from `src/index.ts`

**Breaking changes** (renaming or removing a prop, variant or token) are a major version and are deprecated for one release first.
