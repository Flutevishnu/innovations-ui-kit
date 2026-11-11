# UX Handoff: Innovations UI Kit

## 1. Component States

All interactive components get a 2px `color-focus-ring` outline with 2px offset on keyboard focus only (`:focus-visible`). Disabled is 40% opacity with no pointer events.

| Component | Variants / sizes | States to build |
|---|---|---|
| Button | `primary`, `secondary`, `ghost`, `danger`; `sm` 32px, `md` 40px, `lg` 48px; optional leading icon; icon-only | default, hover, active, focus-visible, disabled, loading |
| TextField | optional hint, error message, character counter, required marker | default, hover, focus, filled, error, disabled, read-only |
| Select | closed state matches TextField; listbox shows max 8 options, then scrolls | default, hover, focus, filled, open, error, disabled, read-only |
| Checkbox | 20px box, label on the right | unchecked, checked, indeterminate, focus-visible, disabled, error |
| Badge | tones: neutral, info, success, warning, danger; sizes `sm`, `md`; pill radius; text only | static (no interactive states) |
| Modal | widths `sm` 400, `md` 560, `lg` 800; full-screen below `md` | closed, open; body scrolls when content overflows |
| Tabs | underline style, horizontal only | default, hover, active (selected), focus-visible, disabled |
| Alert | tones: info, success, warning, danger; optional title, dismiss button, action link | visible, dismissed; on page load vs after user action |
| Card | static or clickable; optional header with actions and footer | default; clickable adds hover (`shadow-2`) and focus-visible |
| Table | sortable columns, row selection, pagination | default, sorted asc, sorted desc, unsorted, row selected, all selected (header), indeterminate (header), empty |

## 2. Tokens

### Colour: primitives

| Token | Hex |
|---|---|
| `blue-50` / `100` / `500` / `600` / `700` | `#EEF4FF` / `#D9E6FF` / `#2F6FED` / `#2459C7` / `#1B449B` |
| `gray-0` / `50` / `100` / `300` / `500` / `700` / `900` | `#FFFFFF` / `#F7F8FA` / `#EEF0F3` / `#C9CED6` / `#6B7380` / `#3A404A` / `#14171C` |
| `green-100` / `600` | `#DDF5E6` / `#1E7F45` |
| `amber-100` / `600` | `#FFF1D6` / `#A35F00` |
| `red-100` / `600` | `#FDE2E1` / `#C4312A` |

### Colour: semantic (light theme)

Components use semantic tokens only, never primitives, so a dark theme can be added later by remapping.

| Semantic token | Maps to |
|---|---|
| `color-bg-canvas` | `gray-50` |
| `color-bg-surface` | `gray-0` |
| `color-text-primary` | `gray-900` |
| `color-text-secondary` | `gray-500` |
| `color-border-default` | `gray-300` |
| `color-action-primary` / `-hover` / `-active` | `blue-500` / `blue-600` / `blue-700` |
| `color-focus-ring` | `blue-500` |
| `color-status-success-bg` / `-fg` | `green-100` / `green-600` |
| `color-status-warning-bg` / `-fg` | `amber-100` / `amber-600` |
| `color-status-danger-bg` / `-fg` | `red-100` / `red-600` |

### Typography

Font: Inter, fallback `system-ui`.

| Token | Size / line-height / weight |
|---|---|
| `font-display` | 32 / 40 / 600 |
| `font-heading` | 24 / 32 / 600 |
| `font-title` | 18 / 26 / 600 |
| `font-body` | 16 / 24 / 400 |
| `font-label` | 14 / 20 / 500 |
| `font-caption` | 12 / 16 / 400 |

### Spacing, radii, elevation, motion

| Group | Tokens |
|---|---|
| Spacing | `space-0` 0, `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 24, `space-6` 32, `space-7` 48, `space-8` 64 |
| Radii | `radius-sm` 4, `radius-md` 8, `radius-lg` 12, `radius-pill` 999 |
| Elevation | `shadow-1` `0 1px 2px rgba(20,23,28,.08)`; `shadow-2` `0 4px 12px rgba(20,23,28,.12)`; `shadow-3` `0 12px 32px rgba(20,23,28,.18)` |
| Motion | `duration-fast` 120ms, `duration-base` 200ms, easing `cubic-bezier(.2,0,0,1)`; disabled under `prefers-reduced-motion` |

## 3. Breakpoints

| Name | Min width | Grid columns | Gutter |
|---|---|---|---|
| `sm` | 0 | 4 | 16 |
| `md` | 768 | 8 | 24 |
| `lg` | 1024 | 12 | 24 |
| `xl` | 1440 | 12 | 24 |

Breakpoint-specific behaviour: Modal is full-screen below `md`; Table behaviour below `md` is TBD (see Q8).

## 4. Clarifying Questions

1. **Button loading:** Does the spinner replace the label or sit beside it? Should the button keep its width so the layout doesn't shift?
2. **Icon-only buttons:** What accessible label and tooltip text should the Table toolbar icon buttons have, and should a tooltip be shown on hover/focus?
3. **Button variants:** The spec gives hover/active colours only for `primary`. What are the hover and active colours for `secondary`, `ghost` and `danger`?
4. **Required fields:** What should screen readers announce for the `*` marker ("required" via `aria-required`, or visible text)? Should optional fields be marked instead?
5. **Character counter:** What happens when the limit is reached: block further typing, or allow it and show an error state?
6. **Select:** Does it need to be searchable or support multi-select? Should we use a native `<select>` or a custom listbox?
7. **Modal overlay:** Should clicking the overlay close the modal? If the modal contains unsaved form data, should it confirm first?
8. **Table below md:** Horizontal scroll or stacked cards? If stacked, which columns are shown and in what order?
9. **Table sorting:** Does the third click return the column to unsorted? What is the default sort when the page loads?
10. **Table selection:** The header checkbox selects the current page. Should there also be a "select all across pages" option, and is selection kept when changing pages?
11. **Tabs overflow:** When tabs don't fit, should they scroll horizontally (with arrows?) or collapse into a "More" menu?
12. **Alerts:** Should alerts shown after a user action (e.g. "Saved") be announced to screen readers (`role="status"` vs `role="alert"`), and do they auto-dismiss? If so, after how long?
13. **Clickable Card:** Can a clickable card contain other interactive elements (buttons, links in the header)? If yes, how should clicks on those be handled?
14. **Badge sizes:** What are the height, padding and font token for Badge `sm` and `md`?
15. **Assets and missing components:** When will the empty-state illustration be supplied? The Team table needs pagination — is a Pagination component in scope, and where is its spec?
16. **Disabled contrast:** 40% opacity on some colours will fail contrast. Is that acceptable for disabled elements, or should disabled use dedicated tokens?
17. **Dark theme:** Will the dark theme reuse the same semantic token names with new mappings, so components need no changes?