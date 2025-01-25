import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  
  const auth = ref(true);

  const user = ref({
    name: "",
    email: "",
    token: ""
  })

  return { auth, user }
}, {persist: true})
