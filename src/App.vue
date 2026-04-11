<template>
  <div class="app-wrapper">
    <button class="hamburger-menu" @click="toggleMobileMenu" title="菜单">
      ☰
    </button>

    <MobileMenu
      :is-open="isMobileMenuOpen"
      @close="closeMobileMenu"
    />

    <div class="app-container">
      <AppSidebar />

      <main class="main-content">
        <router-view />
      </main>
    </div>

    <AppFooter />

    <DraggableAIButton @click="openChat" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import DraggableAIButton from '@/components/layout/DraggableAIButton.vue'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function openChat() {
  router.push('/chat')
}

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
.app-wrapper {
  position: relative;
  z-index: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--text-primary);
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all var(--transition);
  margin: 4px 8px;
}

.nav-item:hover {
  background: var(--hover-overlay);
  color: var(--primary);
}

.nav-item.active {
  background: var(--active-overlay);
  color: var(--primary);
  font-weight: 600;
}

.nav-icon {
  font-size: 1.3em;
}

.logo {
  padding: 24px 20px;
  text-align: center;
  border-bottom: 1px solid var(--border-soft);
}

.logo h1 {
  font-size: 1.5em;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.logo p {
  font-size: 0.8em;
  color: var(--text-secondary);
}

.nav-menu {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;
}
</style>
