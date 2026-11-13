# Innovations UI Kit — UX handoff spec v0.9

From: Innovations Lab UX · To: UI Kit engineers · Status: ready for engineering review

This is the design handoff for the UI Kit, written the way a Figma file is annotated. Your lead may
also share a Figma file; if so, treat the Figma file as the source of truth for visuals and this
document as the source of truth for behaviour.

Your job on Day 6 (Hour 3) is to review it like an engineer receiving a real handoff and write
`docs/ux-handoff.md` with: the states you will build per component, the tokens, the breakpoints,
and **at least 10 clarifying questions**. The spec is deliberately incomplete in places (marked
**TBD** or simply missing) — finding those gaps is the point.

---

## 1. Foundations

### 1.1 Colour — primitive palette

| Token | Hex |
| --- | --- |
| `blue-50` / `100` / `500` / `600` / `700` | `#EEF4FF` / `#D9E6FF` / `#2F6FED` / `#2459C7` / `#1B449B` |
| `gray-0` / `50` / `100` / `300` / `500` / `700` / `900` | `#FFFFFF` / `#F7F8FA` / `#EEF0F3` / `#C9CED6` / `#6B7380` / `#3A404A` / `#14171C` |
| `green-100` / `600` | `#DDF5E6` / `#1E7F45` |
| `amber-100` / `600` | `#FFF1D6` / `#A35F00` |
| `red-100` / `600` | `#FDE2E1` / `#C4312A` |

### 1.2 Colour — semantic tokens (light theme)

| Semantic token | Maps to |
| --- | --- |
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

Dark theme: **TBD** (UX will deliver on Day 8; engineering should make it possible to add without
touching components).

### 1.3 Typography

Font: Inter, fallback system-ui. Scale (size / line-height / weight):

| Token | Value |
| --- | --- |
| `font-display` | 32 / 40 / 600 |
| `font-heading` | 24 / 32 / 600 |
| `font-title` | 18 / 26 / 600 |
| `font-body` | 16 / 24 / 400 |
| `font-label` | 14 / 20 / 500 |
| `font-caption` | 12 / 16 / 400 |

### 1.4 Spacing, radii, elevation, motion

- Spacing scale (px): 0, 4, 8, 12, 16, 24, 32, 48, 64 → `space-0` … `space-8`.
- Radii: `radius-sm` 4, `radius-md` 8, `radius-lg` 12, `radius-pill` 999.
- Elevation: `shadow-1` `0 1px 2px rgba(20,23,28,.08)`; `shadow-2` `0 4px 12px rgba(20,23,28,.12)`; `shadow-3` `0 12px 32px rgba(20,23,28,.18)` (modals).
- Motion: `duration-fast` 120ms, `duration-base` 200ms, easing `cubic-bezier(.2,0,0,1)`. Respect reduced motion.

### 1.5 Breakpoints

| Name | Min width |
| --- | --- |
| `sm` | 0 |
| `md` | 768 |
| `lg` | 1024 |
| `xl` | 1440 |

Layout grid: 4 columns (sm), 8 (md), 12 (lg+). Gutter 16 / 24 / 24.

---

## 2. Components

All interactive components show a 2px `color-focus-ring` outline with 2px offset on keyboard focus
(not on mouse click). Disabled = 40% opacity, no pointer events.

### Button
- Variants: `primary`, `secondary` (outlined), `ghost`, `danger`.
- Sizes: `sm` (32px high), `md` (40px), `lg` (48px).
- States: default, hover, active, focus-visible, disabled, **loading** (spinner replaces label? or
  sits beside it? — TBD).
- Optional leading icon. Icon-only buttons exist in the Table toolbar (no spec for their label).

### TextField
- Label above the input, optional hint below, error message below replacing the hint.
- States: default, hover, focus, filled, error, disabled, read-only.
- Optional character counter "42 / 100" bottom-right.
- Required fields marked with `*` (screen reader text TBD).

### Select
- Native-looking closed state matching TextField. Open state: listbox with max 8 visible options,
  then scroll. Same states as TextField. Searchable? **Not specified.**

### Checkbox
- 20px box, label to the right. States: unchecked, checked, **indeterminate**, disabled, error.

### Badge
- Tones: neutral, info, success, warning, danger. Sizes sm / md. Pill radius. Text only.

### Modal
- Widths: sm 400, md 560, lg 800. Full-screen below `md`.
- Header (title + close icon), body (scrolls), footer (actions right-aligned, primary last).
- Overlay `rgba(20,23,28,.5)`. Closes on Escape and close icon. Click on overlay: **TBD**.

### Tabs
- Underline style, active tab uses `color-action-primary`. Horizontal only.
- Overflow behaviour when tabs do not fit: **not specified**.

### Alert
- Tones: info, success, warning, danger. Optional title, body, dismiss button, optional action link.
- Some alerts appear after a user action (e.g. "Saved"); some are present on page load.

### Card
- Surface background, `radius-lg`, `shadow-1`, 24px padding. Optional header with actions and footer.
- Clickable card variant: whole card navigates. Hover raises to `shadow-2`.

### Table
- Header row `font-label`, body `font-body`, row height 48px, zebra striping off.
- Sortable columns show an arrow; clicking toggles ascending → descending → **(unsorted?)**.
- Row selection with checkboxes (header checkbox selects page).
- Below `md`: **TBD** (horizontal scroll vs stacked cards).
- Empty state: illustration + message (illustration asset not supplied).

---

## 3. Screens to validate the kit (used on Day 8 gallery)

1. **Settings form:** profile name (TextField), email (TextField, read-only), role (Select),
   notifications (Checkbox group), Save (primary) and Cancel (secondary). Success Alert after save.
2. **Team table:** Name, Role, Status (Badge), Last active; sortable by Name and Last active;
   paginated, 10 per page.

## 4. Content guidelines

- Sentence case for all labels and buttons ("Save changes", not "Save Changes").
- Error messages say what to do: "Enter at least 3 characters", not "Invalid input".