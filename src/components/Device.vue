<template>
  <div class="particle-device">
    <h3>{{device.name || device.id}}</h3>
    <div class="variables">
      
    </div>
    <div class="functions">
      <DeviceFunction
        v-for="(func, i) in DeviceInfo().functions"
        :key="i"
        :deviceId="device.id"
        :functionName="func"
        :hasFunctionDescription="FuncHasDescription(func)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DeviceFunction from '@/components/DeviceFunction.vue';
import ParticleService from '@/Services/ParticleService';
import { PartilceDevice, PartilceDeviceInfo } from 'particle-api-js';

@Component({
  components: {
    DeviceFunction,
  },
})
export default class Device extends Vue {

  @Prop()
  private device?: PartilceDevice;
  private device_info: PartilceDeviceInfo | null;

  constructor () {
    super();
    this.device_info = null;
    this.GetInfo();
  }

  private DeviceInfo (): PartilceDeviceInfo { return this.device_info || {} as PartilceDeviceInfo; }
  
  private FuncHasDescription (name: string): boolean {
    
    const vars = this.DeviceInfo().variables;
    if (!vars) { return false; }
    
    return vars[name] !== undefined;
    
  }

  private async GetInfo () {

    if (!this.device) { return; }
    
    this.device_info = (await ParticleService.Instance.Particle.getDevice({
      auth: ParticleService.Instance.Token,
      deviceId: this.device.id,
    })).body;
    
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

