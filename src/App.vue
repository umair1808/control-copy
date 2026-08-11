<template>
  <h1>control-copy demo</h1>

  <!-- ===== Transparent mode ===== -->
  <section>
    <h2>Transparent mode — your button, our copy logic</h2>
    <p class="hint">Zero DOM injected. Copies whatever you pass via the <code>text</code> prop.</p>

    <CtrlC text="This was copied from transparent mode!" :ui="false">
      <button class="demo-btn">Click to copy</button>
    </CtrlC>

    <CtrlC :ui="false" v-slot="{ copy, copied }" text="Copied via scoped slot!">
      <button class="demo-btn" @click="copy">
        {{ copied ? "✅ Copied!" : "Copy (scoped slot)" }}
      </button>
    </CtrlC>
  </section>

  <!-- ===== Widget mode ===== -->
  <section>
    <h2>Widget mode — icon on hover</h2>
    <p class="hint">The original behavior. Wraps an input or textarea with a copy icon.</p>

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
.hint {
  font-size: 0.85rem;
  color: #999;
  margin: 0 0 0.5rem 0;
}
code {
  background: #f0f0f0;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.9em;
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
.demo-btn {
  padding: 0.5rem 1.2rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
.demo-btn:hover {
  background: #43a047;
}
</style>
