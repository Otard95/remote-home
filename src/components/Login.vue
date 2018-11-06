<template>
  <div class="login">
    <h3>Login</h3>
    <input type="username" v-model="username">
    <input type="password" v-model="password">
    <button @click="login">Login</button>
    <div v-if="loading" class="loading"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import Particle from 'particle-api-js'

@Component({
  props: {
    setToken: Function
  }
})
class Login extends Vue {
  
  username = ''
  password = ''
  particle
  isLoading = false;
  
  constructor () {
    super();
    this.particle = new Particle()
  }
  
  get loading () {
    return this.isLoading
  }
  
  login () {
    this.isLoading = true;
    
    this.particle.login({
      username: this.username,
      password: this.username
    })
    .then(res => {
      this.setToken(res.body.access_token);
    })
    .catch(err => {
      console.log('error', err)
    })
    .finally(() => {
      this.isLoading = false
    })
    
  }
  
}
export default Login

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.loading {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, blue, cyan);
  animation: spinn 1.5s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
}

@keyframes spinn {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
