<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Login :setToken="setToken" />
    <LoadingOverlay />
  </div>
</template>

<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import Login from '@/components/Login.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

@Component({
  components: {
    Login,
    LoadingOverlay
  }
})
class Home extends Vue {
  
  particle_access_token
  show_login = false;
  
  constructor () {
    super();
    
    if (!(this.particle_access_token = localStorage.getItem('perticle-token'))) {
      this.show_login = true;
    }
  }
  
  get ShowLoading () {  }
  
  setToken (token) {
    this.particle_access_token = token;
  }
  
}
export default Home

</script>
