<template>
  <header>
    <h1>control-copy</h1>
    <p class="tagline">Copy text to the clipboard in Vue 3. No dependencies, two modes, your call.</p>
    <nav>
      <a href="https://github.com/umair1808/control-copy" class="nav-link">📦 GitHub</a>
      <a href="https://www.npmjs.com/package/control-copy" class="nav-link">📋 npm</a>
    </nav>
  </header>

  <section>
    <h2>You bring the button, we handle the copy</h2>
    <p class="hint">
      Transparent mode adds zero DOM. Drop any clickable element inside, give it something to copy, and you're done.
    </p>

    <div class="demo-row">
      <div class="demo-col">
        <p class="demo-label">Simplest way — just works</p>
        <pre class="demo-code">{{ autoCode }}</pre>
        <CtrlC text="Hello! You just copied this text." :ui="false">
          <button class="demo-btn">Click to copy</button>
        </CtrlC>
        <p class="demo-note">No @click. No wiring. The component figures it out.</p>
      </div>

      <div class="demo-col">
        <p class="demo-label">Need more control? Here's the scoped slot</p>
        <pre class="demo-code">{{ scopedCode }}</pre>
        <CtrlC :ui="false" v-slot="{ copy, copied }" text="You copied this via the scoped slot. Nice.">
          <button class="demo-btn outline" @click="copy">
            {{ copied ? "✅ Copied!" : "Click to copy" }}
          </button>
        </CtrlC>
        <p class="demo-note">You call the shots. Custom feedback, custom styling, custom everything.</p>
      </div>
    </div>
  </section>

  <section>
    <h2>Or just wrap an input — the classic widget mode</h2>
    <p class="hint">
      The original icon-on-hover behavior. Works on inputs, textareas, and plays nice with custom icons.
    </p>

    <div class="demo-row">
      <div class="demo-col">
        <p class="demo-label">Default look</p>
        <CtrlC>
          <input type="text" value="Hover over me and you'll see a clipboard icon" />
        </CtrlC>
      </div>
      <div class="demo-col">
        <p class="demo-label">More room to write? Textareas too</p>
        <CtrlC>
          <textarea rows="3">I'm a textarea. Hover over me — same deal, same icon, same magic.</textarea>
        </CtrlC>
      </div>
    </div>

    <div class="demo-row" style="margin-top: 1rem;">
      <div class="demo-col">
        <p class="demo-label">Your own icon</p>
        <CtrlC copyIcon="📃">
          <input type="text" value="Use any emoji you like" />
        </CtrlC>
      </div>
      <div class="demo-col">
        <p class="demo-label">Always visible, because why not</p>
        <CtrlC :show-icon="true">
          <input type="text" value="No hovering needed — the icon stays put" />
        </CtrlC>
      </div>
    </div>
  </section>

  <footer>
    <p>
      Zero dependencies. ISC licensed.
      <a href="https://github.com/umair1808/control-copy">GitHub</a> ·
      <a href="https://www.npmjs.com/package/control-copy">npm</a>
    </p>
  </footer>
</template>

<script setup>
import CtrlC from ".";

const autoCode = `<CtrlC text="Hello!" :ui="false">
  <button>Copy</button>
</CtrlC>`;

const scopedCode = `<CtrlC v-slot="{ copy, copied }" text="Hello!" :ui="false">
  <button @click="copy">
    {{ copied ? '✅' : 'Copy' }}
  </button>
</CtrlC>`;
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  max-width: 680px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  color: #2c3e50;
  line-height: 1.6;
}

header {
  margin-bottom: 3rem;
}

h1 {
  font-size: 2rem;
  margin: 0 0 0.25rem 0;
  color: #1a1a1a;
}

.tagline {
  font-size: 1.05rem;
  color: #666;
  margin: 0 0 0.75rem 0;
}

nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  font-size: 0.9rem;
  color: #4caf50;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}

h2 {
  font-size: 1.15rem;
  margin: 2.5rem 0 0.25rem 0;
  color: #333;
}

section {
  margin-bottom: 1.5rem;
}

.hint {
  font-size: 0.9rem;
  color: #888;
  margin: 0 0 1rem 0;
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
  padding: 0.55rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
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
  font-size: 0.8rem;
  font-weight: 600;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.4rem 0;
}

.demo-code {
  display: block;
  background: #f8f8f8;
  padding: 0.6rem 0.75rem;
  border-radius: 4px;
  font-size: 0.78rem;
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
  overflow-x: auto;
  color: #555;
  border: 1px solid #eee;
  white-space: pre;
  font-family: "SF Mono", Menlo, Monaco, monospace;
}

.demo-note {
  font-size: 0.8rem;
  color: #aaa;
  margin: 0.5rem 0 0 0;
}

.demo-btn {
  padding: 0.55rem 1.3rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
  margin-bottom: 0.5rem;
  transition: background 0.15s;
}

.demo-btn:hover {
  background: #388e3c;
}

.demo-btn.outline {
  background: white;
  color: #4caf50;
  border: 2px solid #4caf50;
}

.demo-btn.outline:hover {
  background: #e8f5e9;
}

footer {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  font-size: 0.85rem;
  color: #999;
}

footer a {
  color: #4caf50;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
