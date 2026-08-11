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

const getText = (el, binding) => {
  if (binding.value) return binding.value;
  if (el.value !== undefined) return el.value;
  return el.textContent || "";
};

const copy = async (el, binding) => {
  const text = getText(el, binding);

  if (el.select) {
    el.select();
    el.setSelectionRange(0, el.value?.length || text.length);
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      copyFallback(text);
    }
  } catch (ex) {
    // Silently fail for directive usage
  }
};

const vCtrlC = {
  mounted(el, binding) {
    el._ctrlCHandler = () => copy(el, binding);
    el.addEventListener("click", el._ctrlCHandler);
    el.style.cursor = "pointer";
  },
  updated(el, binding) {
    el._ctrlCValue = binding.value;
  },
  unmounted(el) {
    el.removeEventListener("click", el._ctrlCHandler);
    delete el._ctrlCHandler;
  },
};

export default vCtrlC;
