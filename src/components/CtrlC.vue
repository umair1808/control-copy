<template>
  <span ref="slotRef" class="input-container">
    <slot></slot>
    <div @click="handleClick" class="icon-button">{{ copyIcon }}</div>
  </span>
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref } from "vue";

const props = defineProps({
  copyIcon: {
    type: String,
    default: "㊢",
    required: false,
  },
});

const slotRef = ref(null);
let inputTag = null;

onMounted(() => {
  const nodeslist = slotRef.value.childNodes;
  nodeslist.forEach((x) => {
    if (x.nodeName === "INPUT") {
      inputTag = x;
    }
  });
});

const handleClick = async () => {
  inputTag.select();
  inputTag.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  try {
    await navigator.clipboard.writeText(inputTag.value);
  } catch (ex) {
    //ignoring the exception
  }
};
</script>

<style>
/* Icon button container */
.input-container {
  position: relative;
}

/* Icon button styling */
.icon-button {
  display: none;
}

.input-container:hover .icon-button {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa;
  display: none;
  display: block;
}
</style>
