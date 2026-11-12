---
name: react-component-review
description: Reviews a React component in the Innovations UI Kit against the project's accessibility, design token, TypeScript, test and Storybook rules. Use when asked to review, check or audit a component, a component folder or a component PR.
allowed-tools: Read, Grep, Glob
---

# React Component Review

Review only. Do not edit, create or delete files.

## Steps
1. Read `CLAUDE.md` and the component's entry in `docs/ui-kit-ux-spec.md` (variants, sizes, states). Check `docs/ux-handoff.md` for open questions about this component.
2. Read every file in the component folder: `.tsx`, `.module.css`, `.test.tsx`, `.stories.tsx`, `index.ts`.
3. Go through every item in the checklist below.
4. Write the report in the output format below.

## Rules
- Cite every issue as `file:line`. If you cannot point to a line, it is not a finding.
- Only report real problems. If a check passes, list it under "Passed checks".
- Report each problem once. If one cause shows up in several files, list all locations in a single finding.
- Only report problems in the current code, not problems that might appear after future changes.
- If the spec marks something TBD or it is an open question in `docs/ux-handoff.md`, report it under "Questions for UX". Never mark it as a blocker.
- Do not suggest APIs you are not sure exist in the installed React, Storybook, Vitest or Testing Library versions.

## Checklist

### Accessibility
- Uses the correct native element (`<button>`, `<input>`, `<label>`), not a `div` or `span` with `onClick`.
- Keyboard operable: Enter/Space activate buttons; Tab reaches every interactive element.
- Focus ring on `:focus-visible` using `--color-focus-ring`, `--focus-ring-width` and `--focus-ring-offset`. No `outline: none` without a replacement.
- Every control has an accessible name; icon-only controls require `aria-label`.
- ARIA states set where relevant: `aria-busy` (loading), `aria-invalid` and `aria-describedby` (errors, hints), `aria-checked="mixed"` (indeterminate).
- Disabled uses the native `disabled` attribute, so it cannot be clicked or focused.
- Loading and disabled block every activation, including form submission when `type="submit"`, not only `onClick`.
- Animations respect `prefers-reduced-motion`.

### Design tokens
- No hard-coded hex, `rgb()`, or px values for colour, spacing, font size, radius or shadow.
- Semantic tokens only (`--color-action-primary`); never primitives (`--blue-500`, `--gray-0`).
- Variant and size names match the spec exactly (`primary`, `secondary`, `ghost`, `danger`; `sm`, `md`, `lg`).
- Styles are in a CSS Module, not global CSS or inline `style`.

### TypeScript safety
- A `<Component>Props` interface is exported and extends the native element's attributes.
- No `any`, no `@ts-ignore`, no non-null assertion (`!`) without a comment.
- Variants and sizes are union types with defaults.
- Interactive components use `forwardRef`.
- Named exports only (stories files are the exception).

### Test gaps
- A test file exists and queries by role or label, not class names or test IDs.
- Every variant and state from the spec is covered, and variant and size tests assert something that changes per variant or size, not only that the component renders.
- Click and keyboard activation are tested.
- Disabled and loading states are tested to not fire handlers.
- Ref forwarding is tested.
- Not snapshot-only.

### Storybook
- One story per variant and per state listed in the spec.

### Content
- Labels and button text use sentence case ("Save changes").

## Output format

**Verdict:** Approve if there are no blockers; otherwise Request changes. Give a count of blockers, should-fix items and nits.

| Severity | Area | Location | Issue | Suggested fix |
|---|---|---|---|---|

Severity:
- **Blocker:** accessibility failure, `any` or unsafe types in the public API, hard-coded design values, missing tests.
- **Should fix:** missing state coverage, missing stories, convention breaks.
- **Nit:** naming, small style points.

**Passed checks:** short list.

**Questions for UX:** spec gaps found during the review.