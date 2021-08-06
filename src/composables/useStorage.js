import { ref } from '@vue/runtime-dom'
import {projectStorage} from '../firebase/config.js'
import getUser from './getUser.js'


const {user} = getUser()
const useStorage = ()=> {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null) 
    const isPending = ref(false)

    const uploadImage = async(file)=>{
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try{
            const res = await storageRef.put(file) 
            url.value = await res.ref.getDownloadURL()
        }catch(err){
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async(filePath)=> {
        const storageRef = projectStorage.ref(filePath)

        try{
            await storageRef.delete()
        }catch(err){
            console.log(err.message)
            error.value = 'Image is unable to delete'
        }
    }

    return {error,url,filePath, uploadImage, deleteImage}
}

export default useStorage