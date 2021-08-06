<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title" required />
    <textarea placeholder="Playlist description..." v-model="description" required></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error" v-if="fileError">{{fileError}}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from '@/composables/useStorage.js'
import useCollection from '@/composables/useCollection.js'
import {timeStamp} from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'
import { useRouter } from 'vue-router';
export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null)
    const fileError = ref(null)

    const {user} =getUser()
    const {url,filePath, uploadImage} = useStorage()
    const {error,addDoc} = useCollection('Playlist')
    const isPending = ref(false)
    const router = useRouter()

    const handleSubmit = async()=> {
        if(file.value){
            isPending.value = true
            await uploadImage(file.value)
            const res = await addDoc({
                createdAt:timeStamp(),
                title:title.value,
                description:description.value,
                userId: user.value.uid,
                userName: user.value.displayName,
                coverURL: url.value,
                filePath:filePath.value,
                songs:[],
            })
            isPending.value = false
            
            if(!error.value){
            router.push({name:'PlaylistDetails',params:{id:res.id}})
            }
        }
    }

    /* --------------------------- allowed file types --------------------------- */
    const types = ['image/png', 'image/jpeg']
    const handleChange = (e)=> {
        const selectedImage = e.target.files[0]
        console.log(selectedImage)
        if(selectedImage && types.includes(selectedImage.type)){
            file.value = selectedImage
            fileError.value = null
        }else {
            file.value = null
            fileError.value = 'Please select an image file (png or jpeg)'
        }
    }

    return {title, description, handleSubmit, handleChange, fileError, isPending};
  },
};
</script>

<style>

    input[type="file"] {
        border: 0;
        padding: 0;
    }

    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }

    button {
        margin-top: 20px;
    }
</style>