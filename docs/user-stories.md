# User Stories: Innovations UI Kit

---

## US-01: Design tokens

**As a** frontend engineer, **I want** colour, spacing, typography and radius tokens available in code, **so that** components match the Figma design without hard-coded values.

**Acceptance criteria**

- **Given** the tokens defined in the UX spec, **when** I import the tokens, **then** every colour, spacing, font and radius value from the spec is available by name.
- **Given** a component in the kit, **when** its styles are reviewed, **then** it uses tokens and contains no hard-coded hex colours or pixel spacing.
- **Given** UX changes a token value, **when** the token file is updated, **then** all components using it reflect the new value without component code changes.

## US-02: Button component

**As a** frontend engineer, **I want** a Button with primary, secondary, ghost and danger`, **so that** I can add consistent actions to any screen.

**Acceptance criteria**

- **Given** a Button with `variant="primary"`, **when** it renders, **then** it uses the primary colour tokens from the spec.
- **Given** a Button with `size` set to small, medium or large, **when** it renders, **then** padding and font size match the spec for that size.
- **Given** a Button, **when** I click it, **then** the `onClick` handler is called once.
- **Given** a Button that is focused via keyboard, **when** I press Enter or Space, **then** `onClick` is called and a visible focus ring is shown.

## US-03: Button disabled and loading states

**As a** user of a product app, **I want** buttons to show when they are unavailable or busy, **so that** I don't submit actions twice or click something that won't work.

**Acceptance criteria**

- **Given** a Button with `disabled`, **when** I click it, **then** `onClick` is not called and the disabled style is shown.
- **Given** a Button with `loading`, **when** it renders, **then** a spinner is shown, the button is not clickable, and `aria-busy="true"` is set.
- **Given** a loading Button, **when** a screen reader reads it, **then** it announces the button label and its busy state.

## US-04: TextField component

**As a** frontend engineer, **I want** a TextField with a label, helper text and error message, **so that** I can build accessible forms quickly.

**Acceptance criteria**

- **Given** a TextField with a `label`, **when** it renders, **then** the label is programmatically linked to the input.
- **Given** a TextField with `helperText`, **when** it renders, **then** the helper text is shown and linked via `aria-describedby`.
- **Given** a TextField with an `error` message, **when** it renders, **then** the error style is applied, the message is shown, and `aria-invalid="true"` is set.
- **Given** a disabled TextField, **when** I try to type, **then** the value does not change.

## US-05: Checkbox component

**As a** frontend engineer, **I want** a Checkbox with checked, unchecked and indeterminate states, **so that** users can select options in forms and lists.

**Acceptance criteria**

- **Given** an unchecked Checkbox, **when** I click it or press Space, **then** it becomes checked and `onChange` is called with `true`.
- **Given** a Checkbox with `indeterminate`, **when** it renders, **then** the indeterminate icon is shown and `aria-checked="mixed"` is set.
- **Given** a Checkbox with a label, **when** I click the label, **then** the Checkbox toggles.

## US-06: Modal component

**As a** user of a product app, **I want** a modal dialog that keeps my focus inside it, **so that** I can complete or cancel a task without losing my place.

**Acceptance criteria**

- **Given** a closed Modal, **when** it opens, **then** focus moves to the first focusable element inside it.
- **Given** an open Modal, **when** I press Tab repeatedly, **then** focus stays within the Modal.
- **Given** an open Modal, **when** I press Escape or click the close button, **then** it closes and focus returns to the element that opened it.
- **Given** an open Modal, **when** a screen reader reads it, **then** it is announced as a dialog with its title (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).

## US-07: Responsive Card component

**As a** frontend engineer, **I want** a Card that adapts to screen size, **so that** content layouts work on mobile, tablet and desktop.

**Acceptance criteria**

- **Given** a Card with header, body and footer content, **when** it renders, **then** each section uses the spacing tokens from the spec.
- **Given** a viewport below the mobile breakpoint, **when** the Card renders, **then** it takes full width and uses mobile padding.
- **Given** a viewport at tablet or desktop breakpoints, **when** the Card renders, **then** padding and layout match the spec for that breakpoint.

## US-08: Storybook documentation

**As a** UX designer, **I want** every component documented in Storybook with all its variants and states, **so that** I can review the implementation against Figma.

**Acceptance criteria**

- **Given** a component in the kit, **when** I open Storybook, **then** there is a story for each variant and each state (default, hover, focus, disabled, error, loading where relevant).
- **Given** a component story, **when** I open the Docs tab, **then** props, types and default values are listed.
- **Given** the Storybook build, **when** `npm run build-storybook` runs, **then** it completes with no errors.

## US-09: Automated accessibility checks

**As a** QA engineer, **I want** accessibility checks to run automatically on components, **so that** a11y issues are caught before release.

**Acceptance criteria**

- **Given** the component stories, **when** accessibility tests run, **then** each story is checked with axe.
- **Given** a component with a critical a11y violation, **when** tests run, **then** the test run fails and reports the violation.
- **Given** all components meet the rules, **when** tests run, **then** the run passes with no critical violations.

## US-10: Single package entry point

**As a** frontend engineer, **I want** to import all components from one package, **so that** setup in my app is simple.

**Acceptance criteria**

- **Given** the built package, **when** I write `import { Button, TextField } from 'innovations-ui-kit'`, **then** the components import with their TypeScript types.
- **Given** an app that imports only Button, **when** it is bundled, **then** unused components are tree-shaken out.

---
