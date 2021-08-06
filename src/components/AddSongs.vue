<template>
  <div class="add-songs">
      <button v-if="!showForm" @click="showForm=true">Add Songs</button>
      <form v-else @submit.prevent="handleSubmit">
          <h4>Add a new song</h4>
        <input type="text" placeholder="Song Title" v-model="songTitle">
        <input type="text" placeholder="Song Artist" v-model="songArtist">
        <button>Add</button>      
      </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '@/composables/useDocument.js'
export default {
    props:['playlist'],
    setup(props){
        const songTitle = ref('')
        const songArtist = ref('')
        const showForm = ref(false)
        const {updateDocument} = useDocument('Playlist',props.playlist.id)

        const handleSubmit = async()=> {
            const newSong = {
                title:songTitle.value,
                artist:songArtist.value,
                id:Math.floor(Math.random()*1000000)
            }
            await updateDocument({songs:[...props.playlist.songs,newSong]})
            songTitle.value = ''
            songArtist.value = ''
        }
        return {songTitle, songArtist, showForm, handleSubmit}
    }
}
</script>

<style scoped>
    .add-songs {
        text-align: center;
        margin-top: 40px;
        margin-right: 10%;
    }

    form{
        max-width: 100%;
        text-align: left;
    }
</style>