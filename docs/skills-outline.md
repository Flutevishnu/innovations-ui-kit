# Claude Skills Outline


---

## 1. react-component-review

**Frontmatter**
```yaml
name: react-component-review
description: Reviews a React component in the Innovations UI Kit against the project's accessibility, design token, TypeScript, test and Storybook rules. Use when asked to review, check or audit a component or a component PR.
```

**Purpose:** Give a consistent, checklist-based review of a component before it is merged.

**SKILL.md body outline**
1. Read `CLAUDE.md` and the component's spec entry in `docs/ui-kit-ux-spec.md`.
2. Review the component folder (`.tsx`, `.module.css`, `.test.tsx`, `.stories.tsx`) against `checklist.md`.
3. Report findings grouped by severity (blocker, should fix, nit), each with file, line and a suggested fix.
4. Do not edit files; review only.

**Supporting files**
- `checklist.md`: accessibility, design tokens, TypeScript safety, test gaps, story coverage
- `report-template.md`: output format for the review

---

## 2. ux-to-react

**Frontmatter**
```yaml
name: ux-to-react
description: Turns a component entry from the UI Kit UX spec into a React + TypeScript component with CSS Module, tests and stories, following CLAUDE.md conventions. Use when asked to build or implement a component from the UX spec or Figma.
```

**Purpose:** Convert a UX handoff into a component skeleton that matches the project structure and uses only semantic tokens.

**SKILL.md body outline**
1. Find the component in `docs/ui-kit-ux-spec.md`; list its variants, sizes and states.
2. Check `docs/ux-handoff.md` for open questions about it; stop and ask if any are unanswered.
3. Plan the props interface and the files to create; wait for approval.
4. Create the files from `templates/`, using semantic tokens only.
5. Run lint, typecheck and test.

**Supporting files**
- `templates/Component.tsx`, `Component.module.css`, `Component.stories.tsx`, `index.ts`
- `token-mapping.md`: which semantic tokens to use for colour, spacing, type, focus and disabled

---

## 3. test-generator

**Frontmatter**
```yaml
name: test-generator
description: Writes Vitest and React Testing Library tests for a UI Kit component, covering every variant, state and keyboard interaction from the UX spec. Use when asked to write, add or improve tests for a component.
```

**Purpose:** Generate behaviour-focused tests so every state in the spec is covered.

**SKILL.md body outline**
1. Read the component and its spec entry; list the states and interactions to cover.
2. Write tests that query by role and label, not by class names or test IDs.
3. Cover rendering, each variant and state, click and keyboard behaviour, disabled and loading, and accessible names and ARIA attributes.
4. Run `npm run test`; fix failing tests, not the component, unless asked.

**Supporting files**
- `test-patterns.md`: examples of role queries, `user-event` keyboard tests and ref forwarding tests
- `coverage-checklist.md`: states and interactions every component test file must include