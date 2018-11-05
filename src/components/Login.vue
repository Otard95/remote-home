<template>
  <div class="login">
    <h3>Login</h3>
    <input type="username" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="login">Login</button>
    <Spinner v-if="Loading" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Spinner from '@/components/Spinner.vue';
import ParticleService from '@/Services/ParticleService';

@Component({
  components: {
    Spinner,
  },
})
export default class Login extends Vue {
  
  private _is_loading: boolean = false;
  private username: string = '';
  private password: string = '';

  private login (): void {
    
    this._is_loading = true;

    ParticleService.Instance.Particle.login({
      username: this.username,
      password: this.password,
    })
    .then(res => {
      console.log(res.body.access_token);
      ParticleService.Instance.Token = res.body.access_token;
    })
    .catch(err => {
      console.log('error', err);
    })
    .finally(() => {
      this._is_loading = false;
    });

  }

  private get Loading (): boolean { return this._is_loading; }

}
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
