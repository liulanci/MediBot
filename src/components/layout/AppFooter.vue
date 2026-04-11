<template>
  <footer class="footer">
    <div class="footer-quick-actions">
      <button class="quick-action-btn" @click="goToProfile" title="个人中心">
        <span>👤</span>
      </button>
      <button class="quick-action-btn" @click="goToSettings" title="系统设置">
        <span>⚙️</span>
      </button>
    </div>
    <div class="footer-brand">© 2024 医智宝 · 智能健康管理平台</div>
    <div class="footer-slogan">智慧医疗 · 贴心守护</div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProfile() {
  router.push('/profile')
}

function goToSettings() {
  router.push('/settings')
}
</script>
