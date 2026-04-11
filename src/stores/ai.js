import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAIStore = defineStore('ai', () => {
  const messages = ref([])
  const isLoading = ref(false)
  const isChatOpen = ref(false)

  function addMessage(message) {
    messages.value.push({
      id: Date.now(),
      ...message,
      timestamp: new Date().toISOString()
    })
  }

  function clearMessages() {
    messages.value = []
  }

  function setLoading(loading) {
    isLoading.value = loading
  }

  function toggleChat() {
    isChatOpen.value = !isChatOpen.value
  }

  return {
    messages,
    isLoading,
    isChatOpen,
    addMessage,
    clearMessages,
    setLoading,
    toggleChat
  }
})
