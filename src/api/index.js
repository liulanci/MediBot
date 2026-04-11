const API_BASE = '/api'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

export async function getHealth() {
  return request(`${API_BASE}/health`)
}

export async function getScales() {
  return request(`${API_BASE}/scales`)
}

export async function analyzeBMI(data) {
  return request(`${API_BASE}/analyze/bmi`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function analyzeBP(data) {
  return request(`${API_BASE}/analyze/bp`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function analyzeGlucose(data) {
  return request(`${API_BASE}/analyze/glucose`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function chatWithAI(question, userProfile = {}, context = null) {
  return request(`${API_BASE}/chat`, {
    method: 'POST',
    body: JSON.stringify({
      question,
      userProfile,
      context
    })
  })
}

export async function getRecommendedScales(userProfile) {
  return request(`${API_BASE}/recommended-scales`, {
    method: 'POST',
    body: JSON.stringify({ userProfile })
  })
}

export async function getLatinTerm(term) {
  return request(`${API_BASE}/latin/${encodeURIComponent(term)}`)
}

export async function searchLatin(query) {
  return request(`${API_BASE}/latin/search/${encodeURIComponent(query)}`)
}
