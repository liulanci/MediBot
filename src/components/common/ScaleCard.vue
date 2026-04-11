<template>
  <div class="scale-card" @click="$emit('click')">
    <div>
      <span v-if="icon" class="scale-icon">{{ icon }}</span>
      {{ title }}
      <span v-if="badge" class="scale-badge">{{ badge }}</span>
    </div>
    <div class="scale-desc">{{ description }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script>

<style scoped>
.scale-icon {
  margin-right: 8px;
}
</style>
