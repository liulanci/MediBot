<template>
  <div>
    <h1 style="margin-bottom: 24px; color: var(--primary-dark); font-size: 1.8em;">
      💬 AI智能助手
    </h1>

    <div class="card">
      <h2 style="color: var(--primary);">💬 智能咨询</h2>
      <p style="color: var(--text-secondary); margin: 16px 0;">
        输入您的问题，获取智能健康咨询
      </p>

      <div class="chat-container">
        <div class="chat-messages" ref="messagesContainer">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="chat-message"
            :class="msg.role"
          >
            <div class="message-content">{{ msg.content }}</div>
          </div>
        </div>

        <div class="chat-input-area">
          <input
            v-model="inputMessage"
            type="text"
            class="form-input"
            placeholder="请输入您的健康问题..."
            @keyup.enter="sendMessage"
          />
          <button class="btn btn-primary" @click="sendMessage" :disabled="isLoading">
            {{ isLoading ? '发送中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useAIStore } from '@/stores/ai'
import { useUserStore } from '@/stores/user'
import { chatWithAI } from '@/api'

const aiStore = useAIStore()
const userStore = useUserStore()

const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)

const messages = aiStore.messages

onMounted(() => {
  if (messages.length === 0) {
    aiStore.addMessage({
      role: 'assistant',
      content: '您好！我是医智宝AI助手。请问有什么健康问题我可以帮您解答？'
    })
  }
})

async function sendMessage() {
  if (!inputMessage.value.trim() || isLoading.value) return

  const question = inputMessage.value.trim()
  aiStore.addMessage({
    role: 'user',
    content: question
  })
  inputMessage.value = ''
  isLoading.value = true

  try {
    const userProfile = userStore.getProfile()
    const response = await chatWithAI(question, userProfile)
    aiStore.addMessage({
      role: 'assistant',
      content: response.answer || '抱歉，我暂时无法回答这个问题。'
    })
  } catch (error) {
    aiStore.addMessage({
      role: 'assistant',
      content: '抱歉，处理您的问题时出现了错误。'
    })
  } finally {
    isLoading.value = false
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg-hover);
}

.chat-message {
  margin-bottom: 12px;
  max-width: 80%;
}

.chat-message.user {
  margin-left: auto;
  text-align: right;
}

.chat-message.assistant {
  margin-right: auto;
}

.message-content {
  display: inline-block;
  padding: 10px 16px;
  border-radius: var(--radius);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
}

.chat-message.user .message-content {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  color: white;
  border: none;
}

.chat-input-area {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
}

.chat-input-area .form-input {
  flex: 1;
}
</style>
