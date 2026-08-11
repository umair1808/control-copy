<template>
  <span
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
import { onMounted, ref } from "vue";

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
});

const emit = defineEmits(["copy-success", "copy-error"]);

const slotRef = ref(null);
const copied = ref(false);
let inputElement = null;
let copyTimer = null;

onMounted(() => {
  inputElement = slotRef.value.querySelector("input, textarea");
});

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

  // Only attempt select on an actual input/textarea element
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
    emit("copy-success", textToCopy);
  } catch (ex) {
    emit("copy-error", ex);
  }
};
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
