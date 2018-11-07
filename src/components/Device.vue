<template>
  <div class="particle-device">
    <h3>{{device.name || device.id}}</h3>
    <div class="variables">
      <DeviceVariable 
        v-for="(val, key, i) in Variables"
        :key="i"
        :deviceId="device.id"
        :variableName="key"
        :variableType="val"
      />
    </div>
    <div class="functions">
      <DeviceFunction
        v-for="(funcname, i) in Functions"
        :key="i"
        :deviceId="device.id"
        :functionName="funcname"
        :hasFunctionDescription="FuncHasDescription(funcname)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DeviceFunction from '@/components/DeviceFunction.vue';
import DeviceVariable from '@/components/DeviceVariable.vue';
import ParticleService from '@/Services/ParticleService';
import SimpleStore from '@/Services/SimpleStore';
import IsReadyCollection from '@/Models/IsReadyCollection';
import { PartilceDevice, PartilceDeviceInfo, PartilceVariable, ParticleVariableList } from 'particle-api-js';

@Component({
  components: {
    DeviceFunction,
    DeviceVariable,
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

  private get DeviceInfo (): PartilceDeviceInfo {
    return this.device_info || {} as PartilceDeviceInfo;
  }
  
  private get Functions (): string[] {
    return this.DeviceInfo.functions || [];
  }
  
  private get Variables (): ParticleVariableList {
    const variables = this.DeviceInfo.variables;
    if (!variables) { return {} as ParticleVariableList; }
    const filtered = Object.keys(variables)
    .filter(key => !key.startsWith('@'))
    .reduce((obj: any, key: string) => {
      obj[key] = variables[key];
      return obj;
    }, {});
    return filtered;
  }
  
  private FuncHasDescription (name: string): boolean {
    
    const vars = this.DeviceInfo.variables;
    if (!vars) { return false; }
    
    return vars[`@${name}`] !== undefined;
    
  }

  private async GetInfo () {

    if (!this.device) { return; }
    
    this.device_info = (await ParticleService.Instance.Particle.getDevice({
      auth: ParticleService.Instance.Token,
      deviceId: this.device.id,
    })).body;
    console.log(this.device_info);
    
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

