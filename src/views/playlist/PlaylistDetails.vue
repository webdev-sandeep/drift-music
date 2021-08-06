<template>
  <div class="error" v-if="error">{{error}}</div>
  <div class="playlist-details" v-if="playlist">

    <div class="playlist-info">
        <div class="cover">
            <img :src="playlist.coverURL">
        </div>
        <h2>{{playlist.title}}</h2>
        <p class="username">Created By : {{playlist.userName}}</p>
        <p class="description">{{playlist.description}}</p>
        <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been Added to the list.</div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{song.title}}</h3>
          <p>{{song.artist}}</p>
        </div>
        <button v-if="ownership" @click="handleSongDelete(song.id)">delete</button>
      </div>
        <AddSongs v-if="ownership" :playlist="playlist"/>
    </div>
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument.js'
import getUser from '@/composables/getUser.js'
import { computed } from '@vue/runtime-core'
import useDocument from '@/composables/useDocument.js'
import useStorage from '@/composables/useStorage.js'
import { useRouter } from 'vue-router'
import AddSongs from '@/components/AddSongs.vue'
export default {
    props: ['id'],
    setup(props){
        const {error,document:playlist} = getDocument('Playlist',props.id)
        const {user} = getUser()
        const {deleteDocument,updateDocument} = useDocument('Playlist',props.id)
        const {deleteImage} = useStorage()
        const router = useRouter()
        

        const ownership = computed(()=>{
          return playlist.value && user.value && playlist.value.userId == user.value.uid
        })

        const handleDelete = async()=> {
          await deleteImage(playlist.value.filePath)
          await deleteDocument()
          router.push({name:'Home'})
        }

        const handleSongDelete = async(id)=> {
          const newSongList = playlist.value.songs.filter((song)=>song.id != id)
          await updateDocument({songs:newSongList})
        }
        return {error, playlist, ownership, handleDelete, handleSongDelete}
    },
    components: {AddSongs}
}
</script>

<style>
    .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
    margin-left: 20px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 150%;
    max-height: 150%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>