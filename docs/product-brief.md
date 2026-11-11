# Product Brief: Innovations UI Kit

A shared library of reusable React components (buttons, inputs, cards, modals) that teams use to build consistent, accessible UIs faster.

## Problem Statement

Teams rebuild the same UI components in every project. This wastes time, makes products look inconsistent, and causes accessibility bugs. Developers and designers need one trusted set of components that matches the design system.

## Personas

- **Frontend Developer:** wants Drop in ready components, clear props, type safety and build feature fast using components that is trustable.
- **UX Designer:** wants designs built exactly as in Figma.
- **Product Manager:** wants faster, consistent delivery and brand, fewer UI bugs.
- **QA Engineer:** predictable component behaviour and states

## Why (Value)

- **Consistency:** one implementation of each component, matching Figma tokens.
- **Speed:** engineers compose screens from existing parts instead of building from scratch.
- **Quality:** accessibility, states and tests are built in once and reused everywhere.
- **Collaboration:** Storybook gives UX, Product and QA a shared place to review components.

## Journey Map (Frontend Developer)

| Stage     | Action                                         | Thinking                                               | Opportunity                                      |
| --------- | ---------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| Discover  | Receives a Figma screen to build               | "Do we already have this component?"                   | Storybook catalogue, searchable by name          |
| Evaluate  | Opens Storybook, checks variants and states    | "Does it support the disabled/error state?"            | Stories for every variant and state              |
| Integrate | Installs the package and imports the component | "What props does it take?"                             | Typed props, docs and usage examples             |
| Verify    | Compares the result with Figma; runs tests     | "Does it match the design and pass a11accessibilityy?" | Tokens synced with Figma. accessibility built in |
| Feedback  | Finds a gap or bug                             | "Who do I tell?"                                       | Clear contribution and issue process             |

## Requirements

**Functional**

- Provide core components (e.g. Button, TextField, Checkbox, Select, Card, Modal) as React + TypeScript components .Supports variants (primary, secondary) and states (hover, focus, disabled, error)
- Each component supports the variants, sizes and states defined in the UX spec (default, hover, focus, active, disabled, error, loading where relevant)
- Styling uses design tokens (colour, spacing, typography, radius) shared with Figma
- Every component has Storybook stories that document its props, variants and states.
- Components are exported from a single package entry point

**Non-functional**

- Accessible (WCAG 2.1 AA), keyboard operable; visible focus
- Written in strict TypeScript
- At least 80% test coverage
- Responsive on mobile, tablet, and desktop
- Passes lint, typecheck, test, and build
- Browser support: latest two versions of Chrome, Edge, Firefox and Safari

## Success Metrics

| Metric | Target | How measured |
|---|---|---|
| Adoption | At least 2 product apps using the kit within 3 months | Package dependency count |
| Component reuse | 80% of new UI in adopting apps built from kit components | Code review sampling |
| Delivery speed | 30% less time to build a standard form screen | Sprint cycle time comparison |
| Accessibility | 0 critical axe violations in Storybook | Automated a11y checks |
| Design fidelity | 90% of components signed off by UX with no visual changes | UX review in Storybook |
| Quality | 0 open P1 bugs; at least 80% test coverage on components | Issue tracker, coverage report |