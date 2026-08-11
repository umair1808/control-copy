# control-copy

A Vue 3 component to easily add copy-to-clipboard functionality to any HTML input or textarea.

## Install

```bash
npm i control-copy
```

## Usage

### Component

```js
import CtrlC from "control-copy";

// Register globally (optional)
app.use(CtrlC);
```

#### Basic input

```html
<CtrlC>
  <input type="text" value="Click the icon to copy" />
</CtrlC>
```

#### Textarea

```html
<CtrlC>
  <textarea>Works on textareas too.</textarea>
</CtrlC>
```

#### Custom icon

```html
<CtrlC copyIcon="📃">
  <input type="text" />
</CtrlC>

<CtrlC copyIcon="Copy">
  <input type="text" />
</CtrlC>
```

#### Always-visible icon

```html
<CtrlC :show-icon="true">
  <input type="text" />
</CtrlC>
```

#### Copy arbitrary text (no input needed)

```html
<CtrlC text="https://example.com/share-link">
  <button>Copy link</button>
</CtrlC>
```

#### Listen for events

```html
<CtrlC @copy-success="onSuccess" @copy-error="onError">
  <input type="text" />
</CtrlC>
```

Visual feedback is built-in — the icon changes to ✅ for 2 seconds after a successful copy.

### Directive

```js
import { vCtrlC } from "control-copy";
```

```html
<input v-ctrl-c value="Click to copy" />
<p v-ctrl-c>Click this paragraph to copy its text</p>
<button v-ctrl-c="'custom text'">Copy "custom text"</button>
```

Register globally:

```js
app.directive("ctrl-c", vCtrlC);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `copyIcon` | `String` | `"📋"` | Icon or text shown on the copy button |
| `text` | `String` | `null` | Text to copy. When set, copies this instead of reading from an input |
| `showIcon` | `Boolean` | `false` | When `true`, the icon is always visible (not just on hover) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `copy-success` | `string` | Emitted with the copied text on success |
| `copy-error` | `Error` | Emitted with the error object on failure |

## License

ISC &copy; Umair Khan 📬 umair@siqasoft.com
