import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const primary = ref(localStorage.getItem('theme-primary') || '#5B7DB1')
  const primaryLight = ref(localStorage.getItem('theme-primary-light') || '#8FA4C7')
  const primaryDark = ref(localStorage.getItem('theme-primary-dark') || '#3D5A80')

  function setTheme(color) {
    primary.value = color
    primaryLight.value = color + '99'
    primaryDark.value = color + 'CC'
    localStorage.setItem('theme-primary', color)
    localStorage.setItem('theme-primary-light', color + '99')
    localStorage.setItem('theme-primary-dark', color + 'CC')
    applyTheme()
  }

  function applyTheme() {
    document.documentElement.style.setProperty('--primary', primary.value)
    document.documentElement.style.setProperty('--primary-light', primaryLight.value)
    document.documentElement.style.setProperty('--primary-dark', primaryDark.value)
  }

  function initTheme() {
    applyTheme()
  }

  return {
    primary,
    primaryLight,
    primaryDark,
    setTheme,
    initTheme
  }
})
