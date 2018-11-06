<template>
  <div class="home">
    <Login v-if="ShowLogin" />
    <LoadingOverlay v-if="!IsReady" :showSpinner="!InitDone" />
    <Device v-for="deviceInfo in Devices" :device="deviceInfo" :key="deviceInfo.id" />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Model, Emit, Prop } from 'vue-property-decorator';
import Login from '@/components/Login.vue'; 
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import Device from '@/components/Device.vue';
import ParticleService from '@/Services/ParticleService';
import { PartilceDevice } from 'particle-api-js';

@Component({
  components: {
    Login,
    LoadingOverlay,
    Device,
  },
})
export default class Home extends Vue {
  
  private is_ready: boolean = false;
  private init_done: boolean = false;
  private devices: PartilceDevice[];

  constructor () {
    super();
    this.devices = [];
    if (ParticleService.Instance.isLoggedIn) {
      this.GetDevices();
    }
  }

  private get IsReady (): boolean { return this.is_ready || this.ShowLogin; }
  private get InitDone (): boolean { return this.init_done; }
  private get ShowLogin (): boolean { return !ParticleService.Instance.isLoggedIn; }

  private get Devices (): PartilceDevice[] { return this.devices; }

  private async GetDevices () {
    this.devices = (await ParticleService.Instance.Particle.listDevices({
      auth: ParticleService.Instance.Token,
    })).body;
    this.is_ready = true;
  }

}
</script>