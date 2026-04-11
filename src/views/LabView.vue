<template>
  <div>
    <h1 style="margin-bottom: 24px; color: var(--primary-dark); font-size: 1.8em;">
      🧪 检验结果解读
    </h1>

    <div class="card">
      <h2 style="color: var(--primary);">🧪 检验结果解读</h2>
      <p style="color: var(--text-secondary); margin: 16px 0;">
        输入或上传您的检验报告，获取专业解读
      </p>

      <div class="form-group">
        <label class="form-label">检验项目</label>
        <select class="form-select" v-model="labType">
          <option value="">请选择检验项目</option>
          <option value="bmi">BMI身体质量指数</option>
          <option value="bp">血压分析</option>
          <option value="glucose">血糖分析</option>
        </select>
      </div>

      <template v-if="labType === 'bmi'">
        <div class="form-group">
          <label class="form-label">体重 (kg)</label>
          <input type="number" class="form-input" v-model="bmiData.weight" placeholder="请输入体重">
        </div>
        <div class="form-group">
          <label class="form-label">身高 (cm)</label>
          <input type="number" class="form-input" v-model="bmiData.height" placeholder="请输入身高">
        </div>
        <div class="form-group">
          <label class="form-label">年龄</label>
          <input type="number" class="form-input" v-model="bmiData.age" placeholder="请输入年龄">
        </div>
        <div class="form-group">
          <label class="form-label">性别</label>
          <select class="form-select" v-model="bmiData.gender">
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
      </template>

      <template v-else-if="labType === 'bp'">
        <div class="form-group">
          <label class="form-label">收缩压 (mmHg)</label>
          <input type="number" class="form-input" v-model="bpData.systolic" placeholder="请输入收缩压">
        </div>
        <div class="form-group">
          <label class="form-label">舒张压 (mmHg)</label>
          <input type="number" class="form-input" v-model="bpData.diastolic" placeholder="请输入舒张压">
        </div>
      </template>

      <template v-else-if="labType === 'glucose'">
        <div class="form-group">
          <label class="form-label">血糖值 (mmol/L)</label>
          <input type="number" class="form-input" v-model="glucoseData.value" placeholder="请输入血糖值" step="0.1">
        </div>
        <div class="form-group">
          <label class="form-label">测量类型</label>
          <select class="form-select" v-model="glucoseData.type">
            <option value="fasting">空腹血糖</option>
            <option value="postprandial">餐后血糖</option>
            <option value="random">随机血糖</option>
          </select>
        </div>
      </template>

      <button class="btn btn-primary" @click="analyzeLab" :disabled="isAnalyzing">
        {{ isAnalyzing ? '分析中...' : '开始解读' }}
      </button>

      <div v-if="result" class="result-card" style="margin-top: 24px;">
        <h3 style="color: var(--primary); margin-bottom: 12px;">解读结果</h3>
        <div v-html="resultDisplay"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { analyzeBMI, analyzeBP, analyzeGlucose } from '@/api'

const labType = ref('')
const isAnalyzing = ref(false)
const result = ref(null)

const bmiData = ref({
  weight: '',
  height: '',
  age: '',
  gender: ''
})

const bpData = ref({
  systolic: '',
  diastolic: ''
})

const glucoseData = ref({
  value: '',
  type: 'fasting'
})

async function analyzeLab() {
  isAnalyzing.value = true
  result.value = null

  try {
    if (labType.value === 'bmi') {
      const data = await analyzeBMI(bmiData.value)
      result.value = data
    } else if (labType.value === 'bp') {
      const data = await analyzeBP(bpData.value)
      result.value = data
    } else if (labType.value === 'glucose') {
      const data = await analyzeGlucose(glucoseData.value)
      result.value = data
    }
  } catch (error) {
    result.value = { error: '分析失败，请稍后重试' }
  } finally {
    isAnalyzing.value = false
  }
}

const resultDisplay = ref('')
</script>

<style scoped>
.result-card {
  background: var(--bg-hover);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 16px;
}
</style>
