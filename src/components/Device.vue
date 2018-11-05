<template>
  <div class="particle-device">
    <h3>{{device.id}}</h3>
    <p>{{JSON.stringify(DeviceInfo().variables)}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ParticleService from '@/Services/ParticleService';
import { PartilceDevice, PartilceDeviceInfo } from 'particle-api-js';

@Component
export default class Device extends Vue {

  @Prop()
  private device?: PartilceDevice;
  private _device_info: PartilceDeviceInfo | null;

  constructor () {
    super();
    this._device_info = null;
    this.GetInfo();
  }

  private DeviceInfo () { return this._device_info || {} }

  private async GetInfo() {

    if (!this.device) { return; }

    this._device_info = (await ParticleService.Instance.Particle.getDevice({
      auth: ParticleService.Instance.Token,
      deviceId: this.device.id,
    })).body;
    this.$forceUpdate();

  }

}
</script>

<style lang="scss" scoped>

.particle-device {
  width: 900px;
  margin: 0 auto;
  border: 2px solid #777;
  border-radius: 10px;
}

</style>

