<template>
  <h1>control-copy demo</h1>

  <section>
    <h2>Basic input with default icon</h2>
    <CtrlC>
      <input type="text" value="Hover and click the clipboard" />
    </CtrlC>
  </section>

  <section>
    <h2>Textarea</h2>
    <CtrlC>
      <textarea rows="3">Works on textareas too. Click the icon to copy all this text.</textarea>
    </CtrlC>
  </section>

  <section>
    <h2>Custom icon</h2>
    <CtrlC copyIcon="📃">
      <input type="text" value="Custom emoji icon" />
    </CtrlC>
    <CtrlC copyIcon="Copy">
      <input type="text" value="Custom text button" />
    </CtrlC>
  </section>

  <section>
    <h2>Always visible icon</h2>
    <CtrlC :show-icon="true">
      <input type="text" value="Icon is always visible" />
    </CtrlC>
  </section>

  <section>
    <h2>Copy custom text (no input needed)</h2>
    <CtrlC text="This text was copied from the text prop!">
      <button class="copy-btn">Click anywhere in this box to copy</button>
    </CtrlC>
  </section>
</template>

<script setup>
import CtrlC from ".";
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #2c3e50;
}
h1 {
  border-bottom: 2px solid #4caf50;
  padding-bottom: 0.5rem;
}
h2 {
  font-size: 1.1rem;
  margin-top: 2rem;
  color: #666;
}
section {
  margin-bottom: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
textarea {
  resize: vertical;
}
.copy-btn {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}
</style>
