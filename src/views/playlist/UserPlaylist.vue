<template>
  <div class="user-playlist">
    <h3>My Playlist</h3>
    <ListView v-if="playlists" :playlists="playlists"/>
  </div>
  <router-link :to="{name:'CreatePlaylist'}" class="btn">Create a New Playlist </router-link>
</template>

<script>
import getCollection from '@/composables/getCollection.js'
import getUser from '@/composables/getUser.js'
import ListView from '@/components/ListView.vue'
export default {
    components:{ListView},
    setup(){
        const {user} = getUser()
        const {documents:playlists} = getCollection('Playlist',['userId','==',user.value.uid])
        console.log(playlists)
        return {playlists}
    }
}
</script>

<style scoped>
    .user-playlist,.btn{
        margin-left: 20px;
    }

    
</style>