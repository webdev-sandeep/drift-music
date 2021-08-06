import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error =  ref(null)
const isPending = ref(false)

const login = async (email,password) => {
    isPending.value = true
    error.value = null
    try {
        const res = await projectAuth.signInWithEmailAndPassword(email,password)
        error.value = null
        isPending.value = false
        return res
    }catch(e){
        error.value = 'Incorrect email or password!'
        isPending.value = false
    }
    
}

const useLogin = ()=> {
    return {error,login,isPending}
}

export default useLogin