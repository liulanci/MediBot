<template>
  <aside class="sidebar">
    <div class="logo">
      <h1>医智宝</h1>
      <p>智能健康管理平台</p>
    </div>
    <nav class="nav-menu">
      <div
        v-for="page in pages"
        :key="page.id"
        class="nav-item"
        :class="{ active: currentRoute === page.id }"
        @click="navigateTo(page.id)"
      >
        <span class="nav-icon">{{ page.icon }}</span>
        <span class="nav-text">{{ page.name }}</span>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
}
</script>
