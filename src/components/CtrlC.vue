<template>
  <!-- Transparent mode: zero DOM injected -->
  <span v-if="!ui" ref="slotRef">
    <slot :copy="handleClick" :copied="copied"></slot>
  </span>

  <!-- Widget mode: our icon-on-hover UX -->
  <span
    v-else
    ref="slotRef"
    class="ctrl-c-input-container"
    :class="{ 'ctrl-c-show-icon': showIcon }"
  >
    <slot></slot>
    <div
      class="ctrl-c-icon-button"
      :class="{ 'ctrl-c-copied': copied }"
      tabindex="0"
      role="button"
      :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
      @click="handleClick"
      @keydown.enter.prevent="handleClick"
    >
      {{ copied ? "✅" : copyIcon }}
    </div>
  </span>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  copyIcon: {
    type: String,
    default: "📋",
  },
  text: {
    type: String,
    default: null,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  ui: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["copy-success", "copy-error", "copy"]);

const slotRef = ref(null);
const copied = ref(false);
let inputElement = null;
let copyTimer = null;
let transparentChild = null;

const copyFallback = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    return true;
  } catch (ex) {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
};

const showCopiedFeedback = () => {
  copied.value = true;
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const getTextToCopy = () => {
  if (props.text !== null && props.text !== undefined) {
    return props.text;
  }
  if (inputElement) {
    return inputElement.value;
  }
  return "";
};

const handleClick = async () => {
  const textToCopy = getTextToCopy();

  if (inputElement && !props.text) {
    inputElement.select();
    inputElement.setSelectionRange(0, inputElement.value.length);
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      const ok = copyFallback(textToCopy);
      if (!ok) throw new Error("execCommand copy failed");
    }
    showCopiedFeedback();
    emit("copy", textToCopy, true);
    emit("copy-success", textToCopy);
  } catch (ex) {
    emit("copy", textToCopy || "", false);
    emit("copy-error", ex);
  }
};

onMounted(() => {
  if (!props.ui) {
    // Transparent mode: auto-bind click to first child element
    transparentChild = slotRef.value?.firstElementChild;
    if (transparentChild) {
      transparentChild.addEventListener("click", handleClick);
      transparentChild.style.cursor =
        transparentChild.style.cursor || "pointer";
    }
    return;
  }

  // Widget mode: find the input or textarea
  inputElement = slotRef.value.querySelector("input, textarea");
});

onUnmounted(() => {
  if (transparentChild) {
    transparentChild.removeEventListener("click", handleClick);
    transparentChild = null;
  }
});
</script>

<style scoped>
.ctrl-c-input-container {
  position: relative;
}

.ctrl-c-icon-button {
  display: none;
}

.ctrl-c-input-container:hover .ctrl-c-icon-button,
.ctrl-c-show-icon .ctrl-c-icon-button {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa;
  display: block;
  transition: opacity 0.15s ease;
}

.ctrl-c-copied {
  color: #4caf50;
  cursor: default;
}
</style>
