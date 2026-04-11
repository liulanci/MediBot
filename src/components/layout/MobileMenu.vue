<template>
  <div class="mobile-menu" :class="{ active: isOpen }" @click.self="$emit('close')">
    <div class="mobile-menu-content">
      <div class="mobile-menu-header">
        <div>菜单</div>
        <button class="mobile-menu-close" @click="$emit('close')">✕</button>
      </div>
      <nav class="mobile-menu-nav">
        <a
          v-for="page in pages"
          :key="page.id"
          href="#"
          class="mobile-menu-item"
          :class="{ active: currentRoute === page.id }"
          @click.prevent="navigateTo(page.id)"
        >
          <span class="icon">{{ page.icon }}</span>
          <span>{{ page.name }}</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()

const pages = [
  { id: 'dashboard', name: '首页', icon: '🏠' },
  { id: 'assessment', name: '健康评估', icon: '🩺' },
  { id: 'chat', name: '智能咨询', icon: '💬' },
  { id: 'lab', name: '检验解读', icon: '🧪' },
  { id: 'profile', name: '个人中心', icon: '👤' },
  { id: 'settings', name: '系统设置', icon: '⚙️' }
]

const currentRoute = computed(() => {
  const path = route.path.replace('/', '')
  return path || 'dashboard'
})

function navigateTo(pageId) {
  router.push(`/${pageId}`)
  emit('close')
}
</script>
