# AI Usage Log

| Hour | Tool | What I used it for |
| ---- | ---- | ------------------ |
| 1 | Claude | Formatting docs/product-brief.md |
| 2 | Claude | Formatting docs/user-stories.md |
| 3 | Claude | Formatting docs/ux-handoff.md |
| 5 | Claude Code (plan mode) | Planning the scaffold, tokens and Button |
| 8 | Claude Code (manual approval) | Implementing the reviewed plan: scaffold, tokens and Button; I reviewed each diff and ran the scripts myself |

## Hour 5: Planning Session

**Accepted**
- Dependencies for build, types, tests and Storybook, including `@storybook/addon-a11y`
- Primitive and semantic token split, with breakpoints as TS constants
- Button API, tests and stories as planned
- Asking open UX questions instead of guessing
- Verification steps and small Conventional Commits

**Rejected or changed**
- `eslint-plugin-react-refresh`: rejected, only needed for apps, not a library
- `import/no-default-export`: changed to the built-in `no-restricted-exports` (the plugin it needs wasn't in the plan)
- Latest versions at install time: changed to exact versions with a committed lockfile
- Treating `docs/ux-handoff.md` as the source over the UX spec: changed, the spec is the source
- "CLAUDE.md refers to main as the main branch": rejected, incorrect; work goes on `feature/scaffold-ui-kit` and merges into `master` via PR
- New tokens `--color-text-on-action` and `--size-control-*`: changed to pending UX confirmation