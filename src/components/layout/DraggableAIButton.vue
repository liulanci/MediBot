<template>
  <button
    class="ask-ai-btn"
    :style="positionStyle"
    @click="$emit('click')"
    title="咨询AI助手（可拖动）"
  >
    🤖
  </button>
</template>

<script setup>
import { useDraggable } from '@vueuse/core'

defineEmits(['click'])

const { style } = useDraggable(undefined, {
  initialValue: { x: window.innerWidth - 90, y: window.innerHeight - 90 }
})

const positionStyle = style
</script>
