<template>
  <div class="home">
    <div class="error" v-if="error">Could not fetch the data.</div>
    <div v-if="documents">
      <ListView :playlists="documents"/>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection.js";
import ListView from '../components/ListView.vue'
export default {
  components:{ListView},
  setup() {
    const { error, documents } = getCollection("Playlist");

    return { error, documents };
  },
};
</script>
