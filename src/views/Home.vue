<template>
  <div class="home">
    <Login v-if="ShowLogin" />
    <LoadingOverlay v-if="!IsReady()" :showSpinner="!InitDone()" />
    <Device v-for="deviceInfo in Devices()" :device="deviceInfo" :key="deviceInfo.id" />
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
  
  private _is_ready: boolean = false;
  private _init_done: boolean = false;
  private _devices: PartilceDevice[];

  constructor () {
    super();
    this._devices = [];
    if (ParticleService.Instance.isLoggedIn) {
      this.GetDevices();
    }
  }

  private IsReady (): boolean { return this._is_ready; }
  private InitDone (): boolean { return this._init_done; }
  private get ShowLogin (): boolean { return !ParticleService.Instance.isLoggedIn; }

  private Devices (): PartilceDevice[] { return this._devices; }

  private async GetDevices () {
    this._devices = (await ParticleService.Instance.Particle.listDevices({
      auth: ParticleService.Instance.Token,
    })).body;
    this._is_ready = true;
    this.$forceUpdate();
  }

}
</script>