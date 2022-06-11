<template>
  <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <input type="text" placeholder="Display Name" v-model="displayName">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <div class="error" v-if="error">{{error}}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup.js'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const {error,signup,isPending} = useSignup()
        const router = useRouter()

        const handleSubmit = async()=> {
            const res = await signup(email.value,password.value,displayName.value)
            if(!error.value){
                router.push({name:'Home'})
            }
        }

        return {displayName, email, password, error, isPending, handleSubmit}
    }
}
</script>

<style>

</style>