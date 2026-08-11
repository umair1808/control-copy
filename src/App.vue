<template>
  <h1>control-copy demo</h1>

  <!-- ===== Transparent mode ===== -->
  <section>
    <h2>Transparent mode — your UI, our copy logic</h2>
    <p class="hint">Zero DOM injected. Pass <code>:ui="false"</code> with a <code>text</code> prop and any clickable child.</p>

    <div class="demo-row">
      <div class="demo-col">
        <p class="demo-label">Automatic — drop a child, it just works</p>
        <code class="demo-code">&lt;CtrlC text="..." :ui="false"&gt;<br/>&nbsp;&nbsp;&lt;button&gt;Copy&lt;/button&gt;<br/>&lt;/CtrlC&gt;</code>
        <CtrlC text="This was copied from transparent mode!" :ui="false">
          <button class="demo-btn">Click to copy</button>
        </CtrlC>
      </div>

      <div class="demo-col">
        <p class="demo-label">Scoped slot — full control with <code>copied</code> state</p>
        <code class="demo-code">&lt;CtrlC v-slot="{ copy, copied }"&gt;<br/>&nbsp;&nbsp;&lt;button @click="copy"&gt;...&lt;/button&gt;<br/>&lt;/CtrlC&gt;</code>
        <CtrlC :ui="false" v-slot="{ copy, copied }" text="Copied via scoped slot!">
          <button class="demo-btn outline" @click="copy">
            {{ copied ? "✅ Copied!" : "Click to copy" }}
          </button>
        </CtrlC>
      </div>
    </div>
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
.demo-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.demo-col {
  flex: 1 1 280px;
}
.demo-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  margin: 0 0 0.5rem 0;
}
.demo-code {
  display: block;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
  overflow-x: auto;
}
.demo-btn {
  padding: 0.5rem 1.2rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}
.demo-btn:hover {
  background: #43a047;
}
.demo-btn.outline {
  background: white;
  color: #4caf50;
  border: 2px solid #4caf50;
}
.demo-btn.outline:hover {
  background: #e8f5e9;
}
</style>
