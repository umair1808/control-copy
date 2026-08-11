# control-copy

A Vue 3 component to copy text to the clipboard. Two modes, zero runtime dependencies.

📎 **[Live demo →](https://umair1808.github.io/control-copy/)**

## Install

```bash
npm i control-copy
```

## Quick start

### Transparent mode — your UI, our copy logic

Zero DOM injected. Pass any clickable child and the `text` prop. Matches the react-copy-to-clipboard API.

```html
<CtrlC text="Hello, clipboard!" :ui="false">
  <button>Copy</button>
</CtrlC>
```

For custom feedback, use the scoped slot:

```html
<CtrlC text="Hello!" :ui="false" v-slot="{ copy, copied }">
  <button @click="copy">
    {{ copied ? "✅ Copied!" : "Copy" }}
  </button>
</CtrlC>
```

### Widget mode — icon on hover

The original UX. Wrap an input or textarea and get a copy icon.

```html
<CtrlC>
  <input type="text" value="Click the clipboard icon" />
</CtrlC>
```

### Register globally

```js
import CtrlC from "control-copy";
app.use(CtrlC); // registers <CtrlC> and v-ctrl-c directive
```

## Directive

```js
import { vCtrlC } from "control-copy";
app.directive("ctrl-c", vCtrlC);
```

```html
<input v-ctrl-c value="Click to copy" />
<p v-ctrl-c>Click this paragraph to copy its text</p>
<button v-ctrl-c="'custom text'">Copy "custom text"</button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` | `null` | Text to copy. Required in transparent mode; optional in widget mode (reads from input) |
| `ui` | `Boolean` | `true` | When `true`, renders the icon-on-hover widget. When `false`, transparent mode — zero DOM, just wires click to the child |
| `copyIcon` | `String` | `"📋"` | (Widget mode) Icon or text shown on the copy button |
| `showIcon` | `Boolean` | `false` | (Widget mode) When `true`, the icon is always visible, not just on hover |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `copy` | `(text: string, result: boolean)` | Emitted after every copy attempt. `result` is `true` on success |
| `copy-success` | `string` | Emitted with the copied text on success |
| `copy-error` | `Error` | Emitted with the error object on failure |

## License

ISC &copy; Umair Khan 📬 umair@siqasoft.com
