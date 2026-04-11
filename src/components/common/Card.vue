<template>
  <div class="card">
    <div v-if="title" class="card-title">
      <slot name="icon">{{ icon }}</slot>
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>
