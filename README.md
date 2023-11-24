# control-copy

A vue3.js component to easily add copy to clipboard functionality to any html input tag

## Install

```bash
npm i control-copy
```

## Usage

```js
import CtrlC from "control-copy";

//for displaying default icon in your template. Wrap input tag in <CtrlC></Ctrl>
<CtrlC>
  <input type="text" />
</CtrlC>

//or to display your emoji icon, pass in any emoji as prop
<CtrlC copyIcon="📃">
  <input type="text" />
</CtrlC>

//or to display any string as copy button, pass in any string as prop
<CtrlC copyIcon="C">
  <input type="text" />
</CtrlC>
```

## Note

At the moment only one child input tag is supported and only emoji and string are accepted as **copyIcon** param

## License

ISC &copy; Umair Khan 📬 umair@siqasoft.com
