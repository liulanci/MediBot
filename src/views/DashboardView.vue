<template>
  <div>
    <h1 style="margin-bottom: 24px; color: var(--primary-dark); font-size: 1.8em;">
      🏠 欢迎使用医智宝
    </h1>

    <div class="card">
      <h2 style="color: var(--primary); margin-bottom: 16px;">欢迎使用医智宝</h2>
      <p style="color: var(--text-secondary); line-height: 1.8;">
        医智宝是您的智能健康管理助手，提供专业的健康评估、疾病诊断支持和个性化健康建议。
      </p>
    </div>

    <div class="scales-grid">
      <ScaleCard
        title="健康评估"
        description="30+专业医学量表"
        icon="🩺"
        badge="推荐"
        @click="goToAssessment"
      />
      <ScaleCard
        title="AI助手"
        description="智能健康咨询"
        icon="🤖"
        badge="热门"
        @click="goToChat"
      />
      <ScaleCard
        title="检验解读"
        description="医学检验分析"
        icon="🧪"
        @click="goToLab"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ScaleCard from '@/components/common/ScaleCard.vue'

const router = useRouter()

function goToAssessment() {
  router.push('/assessment')
}

function goToChat() {
  router.push('/chat')
}

function goToLab() {
  router.push('/lab')
}
</script>
