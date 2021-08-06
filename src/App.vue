<template>
  <div class="content">
    <Navbar />
    <router-view/>
  </div>
</template>
<script>

import Navbar from './components/Navbar.vue'
export default {
  setup() {
  },
  components: {Navbar}
}
</script>
<style>
 .content {
   max-width: 100%;
 }
</style>
