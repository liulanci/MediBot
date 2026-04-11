import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref(localStorage.getItem('user-name') || '')
  const age = ref(parseInt(localStorage.getItem('user-age')) || '')
  const gender = ref(localStorage.getItem('user-gender') || '')

  function updateProfile(profile) {
    if (profile.name !== undefined) {
      name.value = profile.name
      localStorage.setItem('user-name', profile.name)
    }
    if (profile.age !== undefined) {
      age.value = profile.age
      localStorage.setItem('user-age', profile.age)
    }
    if (profile.gender !== undefined) {
      gender.value = profile.gender
      localStorage.setItem('user-gender', profile.gender)
    }
  }

  function getProfile() {
    return {
      name: name.value,
      age: age.value,
      gender: gender.value
    }
  }

  return {
    name,
    age,
    gender,
    updateProfile,
    getProfile
  }
})
