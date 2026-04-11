<template>
  <div>
    <h1 style="margin-bottom: 24px; color: var(--primary-dark); font-size: 1.8em;">
      🩺 专业健康评估
    </h1>

    <div class="card">
      <h2 style="color: var(--primary);">健康评估量表</h2>
      <p style="color: var(--text-secondary); margin: 16px 0;">
        选择您需要的评估类型开始测试
      </p>
    </div>

    <div class="scales-grid">
      <ScaleCard
        title="心理健康评估"
        description="SCL-90、SAS、SDS等专业量表"
        icon="📊"
        @click="selectScale('mental')"
      />
      <ScaleCard
        title="认知功能评估"
        description="MMSE、MoCA等认知筛查"
        icon="🧠"
        @click="selectScale('cognitive')"
      />
      <ScaleCard
        title="心血管风险评估"
        description="Framingham、SCORE等评分"
        icon="❤️"
        @click="selectScale('cardiovascular')"
      />
      <ScaleCard
        title="糖尿病风险评估"
        description="FINDRISC、ARC等工具"
        icon="🩸"
        @click="selectScale('diabetes')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScaleCard from '@/components/common/ScaleCard.vue'
import { getScales } from '@/api'

const scales = ref([])

onMounted(async () => {
  try {
    const data = await getScales()
    scales.value = data.scales || []
  } catch (error) {
    console.error('Failed to load scales:', error)
  }
})

function selectScale(type) {
  console.log('Selected scale type:', type)
}
</script>
