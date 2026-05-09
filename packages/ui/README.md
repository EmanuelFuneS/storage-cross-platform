# `@repo/ui` — Design System

Shared UI component library for the Storage application. Built with React 19, Tailwind CSS v4, and TypeScript.

## Tech Stack

- **React 19.2** + TypeScript
- **Tailwind CSS v4** via PostCSS
- **next-themes** (dark mode)
- **lucide-react** (icons)
- **react-hook-form** (input component)
- **clsx** + **tailwind-merge** via `cn()` utility

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Variants: `default`, `danger`, `static`. Optional hover scale animation. |
| `Card` | Container with optional hover scale, rounded corners, and border. |
| `Code` | Inline `<code>` wrapper with theme-aware styling. |
| `Input` | React Hook Form–integrated input with label, errors, and dark mode support. |
| `Modal` | Overlay modal with backdrop blur, built on `Card` + `Button`. |
| `Separator` | Horizontal divider. |
| `Typography` | Renders `h1`–`h6`, `p`, or `span` with a type scale: `display` (6xl), `headline` (3xl), `title` (xl), `body` (sm). |

## Theme

Uses Tailwind CSS v4 with `@custom-variant dark` and custom CSS variables for all tokens. Dark mode is driven by `next-themes`.

The file `src/styles/globals.css` defines color tokens: `background`, `foreground`, `primary`, `secondary`, `tertiary`, `surface`, `error`, `elevated`, `card`, `muted`, `accent`, `popover`, `danger`.

All elements apply `border-dashed` by default.

## Usage

```tsx
import { Button, Card, Typography } from "@repo/ui";

function Example() {
  return (
    <Card>
      <Typography as="h2" type="headline">Hello</Typography>
      <Button variant="default">Click me</Button>
    </Card>
  );
}
```
