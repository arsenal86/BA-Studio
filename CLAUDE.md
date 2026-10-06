# CLAUDE.md

## Design system

All UI work must use the **BA Studio UK** design system:
https://claude.ai/artifact/T8dX7AjnDi1hPjActcJTa7

- **Tokens:** colours live in `src/styles/tokens.css` (light on `:root`, dark on `.dark`) and are mapped to Tailwind utilities in `src/index.css`. Use `bg-surface-100`, `text-ink`, `text-brand-navy`, `border-divider` and so on. Tailwind's default palette is switched off, so classes such as `bg-slate-100` generate nothing. Never use hex values in TSX.
- **Components:** reuse `components/ui/*` (Button, Card, PageHeader, Input/Textarea/FieldLabel, Alert, Spinner, Modal, SegmentedControl, Tag, MarkdownOutput) before writing new markup. Use `buttonClasses()` and `cardClasses()` when an `<a>` or `<button>` needs that styling.
- **Type:** Montserrat. Use the scale utilities `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small` and `text-label`. `text-label` is always `uppercase`.
- **Spacing:** use Tailwind steps that match the design system's 4px scale only: 1, 2, 4, 6, 8, 12 and 16 (4, 8, 16, 24, 32, 48 and 64px).
- **Radius:** `rounded-sm` (inputs, tags), `rounded-md` (buttons, cards), `rounded-pill`.
- **Rules from the design system:**
  - `brand-teal` is never used for body-size text; use `brand-mid`.
  - Keep UI fills flat. The navy-to-teal gradient (`.text-gradient-brand`) is for hero moments only.
  - Prefer borders over shadows. `shadow-overlay` is only for the modal and drawer.
  - The SVG logo only sits on white. Dark mode uses the `Wordmark`.
- **Copy:** plain UK English and sentence case for headings and buttons.
- **App-local tokens** (not yet in the design system): `danger`, `success` and their `*-surface` colours, `overlay` and `shadow-overlay`. Add new tokens to the design system first, then mirror them in `tokens.css`.
- Theme switching relies on the `dark` class on `<html>`. `src/test/App.test.tsx` asserts this.
