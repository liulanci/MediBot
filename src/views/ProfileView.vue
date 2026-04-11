<template>
  <div>
    <h1 style="margin-bottom: 24px; color: var(--primary-dark); font-size: 1.8em;">
      👤 个人中心
    </h1>

    <div class="card">
      <h2 style="color: var(--primary);">👤 个人中心</h2>
      <p style="color: var(--text-secondary); margin: 16px 0;">
        管理您的个人信息
      </p>

      <div class="form-group">
        <label class="form-label">姓名</label>
        <input type="text" class="form-input" v-model="profile.name" placeholder="请输入姓名">
      </div>

      <div class="form-group">
        <label class="form-label">年龄</label>
        <input type="number" class="form-input" v-model="profile.age" placeholder="请输入年龄">
      </div>

      <div class="form-group">
        <label class="form-label">性别</label>
        <select class="form-select" v-model="profile.gender">
          <option value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </div>

      <button class="btn btn-primary" @click="saveProfile">
        保存信息
      </button>

      <p v-if="saveMessage" style="margin-top: 16px; color: var(--success);">
        {{ saveMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const profile = ref({
  name: '',
  age: '',
  gender: ''
})

const saveMessage = ref('')

onMounted(() => {
  const stored = userStore.getProfile()
  profile.value = { ...stored }
})

function saveProfile() {
  userStore.updateProfile(profile.value)
  saveMessage.value = '保存成功！'
  setTimeout(() => {
    saveMessage.value = ''
  }, 3000)
}
</script>
