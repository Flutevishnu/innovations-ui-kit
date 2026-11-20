# Component API Proposals: Button and TextField

## Shared rules

- Function components with named exports. No default exports.
- Export a `<Component>Props` interface that extends the native element's props.
- Forward the `ref` to the underlying native element.
- Spread unknown props (`...rest`) onto the native element, so `id`, `aria-*`, `data-*` and event handlers work.
- `variant` and `size` are closed string unions using the exact names from the UX spec.
- Styling uses CSS Modules and semantic tokens only.

---

## Button

### Props

```ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
}
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Heights 32, 40 and 48px. |
| `loading` | `boolean` | `false` | Shows a spinner, sets `aria-busy`, blocks clicks and form submission. |
| `leadingIcon` | `ReactNode` | none | Icon before the label. Hidden from assistive tech. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Defaults to `'button'`, so a Button inside a form does not submit by accident. |
| `children` | `ReactNode` | none | The label. |

All other `button` attributes (`disabled`, `onClick`, `aria-label`, `id` and so on) are passed through.

### Design decisions

- `variant` **and** `size` **are unions, not booleans.** Booleans like `isPrimary` and `isDanger` allow impossible combinations. A union allows exactly one value.
- `loading` **keeps the button focusable.** It sets `aria-disabled` and cancels the click, instead of using the native `disabled` attribute, so keyboard focus is not lost when an action starts.
- `leadingIcon` **is a slot, not an icon-name prop.** The Button does not need to know about any icon library.
- **Ref** is forwarded to the `<button>` element.
- **Controlled vs uncontrolled:** not applicable. The component holds no state.
- **Polymorphism:** not supported. A link that looks like a button is a different element with different semantics, so for now use a link element styled separately. Revisit if a real need appears.

### States

default, hover, active, focus-visible, disabled, loading. Focus ring only on `:focus-visible`.

### Accessibility

- Renders a native `<button>`, so Enter and Space work without extra code.
- `aria-busy` is set while loading.
- A visible label is required today, because icon-only buttons are not supported yet.

### Open questions

- Q1: does the spinner replace the label, and does the button keep its width?
- Q2: icon-only buttons: accessible label and tooltip.
- Q3: hover and active colours for `secondary`, `ghost` and `danger`.
- Q16: disabled contrast at 40% opacity.

---

## TextField

### Props

```ts
export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  maxLength?: number;
  showCounter?: boolean;
}
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | required | Visible label, always rendered. |
| `hint` | `string` | none | Helper text below the input. |
| `error` | `string` | none | Error message. Its presence puts the field in the error state. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Same heights as Button. Replaces the native `size` attribute, which is omitted from the native props. |
| `required` | `boolean` | `false` | Shows the required marker and sets `required` on the input. |
| `maxLength` | `number` | none | Native limit, also used by the counter. |
| `showCounter` | `boolean` | `false` | Shows a character counter. |
| `value` / `defaultValue` / `onChange` | native | none | See "Controlled vs uncontrolled". |
| `disabled` / `readOnly` | `boolean` | `false` | Native attributes. |

All other `input` attributes (`type`, `name`, `placeholder`, `autoComplete`, `id` and so on) are passed through to the `<input>`.

### Design decisions

- `label` **is required.** Every input must be labelled. Making it a required prop turns a missing label into a compile error. For a design with no visible label, a separate prop such as `hideLabel` would keep the label in the DOM for screen readers.
- **Label association.** The component generates an id (with React's `useId`) when none is passed, and connects the `<label htmlFor>` to the input. Callers never wire this up by hand.
- `error` **and** `hint` **are separate props.** They mean different things. If both are set, the error replaces the hint, so only one message is shown at a time.
- **Error state is derived from** `error`**.** There is no separate `invalid` boolean, so the message and the state cannot disagree. When `error` is set, the input gets `aria-invalid="true"`.
- `aria-describedby` points at the hint or error element (and the counter, if shown), so screen readers announce them with the field.
- **Controlled vs uncontrolled:** both are supported by passing `value`/`onChange` or `defaultValue` straight to the native input. The component does not keep its own copy of the value. The counter reads the value from the input element, so it works in both modes.
- **Ref** is forwarded to the `<input>`, so callers can call `.focus()` on validation errors.
- **Composition:** no slots for now. Leading and trailing adornments are not in the UX spec.
- **Polymorphism:** not applicable.

### States

default, hover, focus, filled, error, disabled, read-only.

### Accessibility

- A `<label>` is connected to the `<input>` through `htmlFor` and `id`.
- `aria-invalid` is set while `error` is present. The error text is linked with `aria-describedby`.
- The required marker is visual only (`aria-hidden`). The native `required` attribute tells screen readers.
- Focus ring on `:focus-visible` only.
- `prefers-reduced-motion` is respected through the shared motion tokens.

### Open questions

- Q4: what should screen readers announce for the required marker, and should optional fields be marked instead?
- Q5: what happens at the character limit: block typing, or allow it and show an error?
- Q16: disabled contrast at 40% opacity.
