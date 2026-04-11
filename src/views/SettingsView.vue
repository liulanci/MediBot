<template>
  <div>
    <h1 style="margin-bottom: 24px; color: var(--primary-dark); font-size: 1.8em;">
      ⚙️ 系统设置
    </h1>

    <div class="card">
      <h2 style="color: var(--primary);">⚙️ 系统设置</h2>
      <p style="color: var(--text-secondary); margin: 16px 0;">
        自定义您的偏好设置
      </p>

      <div class="form-group">
        <label class="form-label">主题颜色</label>
        <select class="form-select" v-model="selectedTheme" @change="changeTheme">
          <option value="#5B7DB1">专业蓝</option>
          <option value="#10B981">清新绿</option>
          <option value="#8B5CF6">优雅紫</option>
          <option value="#F59E0B">活力橙</option>
        </select>
      </div>

      <div class="theme-preview">
        <div class="theme-swatch" :style="{ background: selectedTheme }"></div>
        <span>当前主题预览</span>
      </div>

      <button class="btn btn-primary" @click="saveSettings">
        保存设置
      </button>

      <p v-if="saveMessage" style="margin-top: 16px; color: var(--success);">
        {{ saveMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const selectedTheme = ref(themeStore.primary)
const saveMessage = ref('')

onMounted(() => {
  selectedTheme.value = themeStore.primary
})

function changeTheme() {
  themeStore.setTheme(selectedTheme.value)
}

function saveSettings() {
  saveMessage.value = '设置已保存！'
  setTimeout(() => {
    saveMessage.value = ''
  }, 3000)
}
</script>

<style scoped>
.theme-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.theme-swatch {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}
</style>
