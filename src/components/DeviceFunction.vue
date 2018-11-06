<template>
  <div class="device-function">
    <h3>{{FunctionName}}</h3>
    <button @click="CallFunction">Call</button>
    <div class="args">
      <input type="text" v-if="!hasFunctionDescription"
             placeholder="Argunemts" v-model="func_arg" >
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ParticleService from '@/Services/ParticleService';

@Component
export default class DeviceFunction extends Vue {
  
  @Prop(String) private deviceId?: string;
  @Prop(String) private functionName?: string;
  @Prop(Boolean) private hasFunctionDescription?: boolean;
  private func_arg: string = '';
  private function_description: string | undefined;
  
  constructor () {
    super();
    
    if (!this.deviceId) {
      throw new Error(`Unspesified device id for function '${this.functionName}'!`);
    }
    if (this.hasFunctionDescription) {
      this.GetFunctionDetails();
    }
    
  }
  
  private CallFunction (): void {
    if (!this.function_description) {
      ParticleService.Instance.Particle.callFunction(
        {
          auth: ParticleService.Instance.Token,
          deviceId: this.deviceId,
          name: this.functionName,
          argument: this.func_arg || '',
        },
      )
      .then(res => console.log(res.body.return_value))
      .finally(() => this.func_arg = '');
    } else {
      
    }
  }
  
  private get FunctionName (): string {
    if (!this.functionName) { return 'Unnamed function'; }
    return this.functionName.replace(
      /([A-Z]|^\w)/g,
      (_, _1: string) => ' ' + _1.toUpperCase(),
    ).slice(1);
  }
  private FunctionDescription (): string { return this.function_description || ''; }
  
  private async GetFunctionDetails () {
    
    this.function_description = (await ParticleService.Instance.Particle.getVariable({
      auth: ParticleService.Instance.Token,
      deviceId: this.deviceId,
      name: `@${this.functionName}`,
    })).body.result as string;
    
  }
  
}
</script>

<style lang="scss" scoped>

.device-function {
  display: grid;
  width: 500px;
  padding: 10px;
  margin: 0 auto;
  border: 2px solid #eee;
  border-radius: 5px;
  
  grid-template-columns: 3fr 1fr;
}

h3 {
  text-align: left
}

button {
  height: 60%;
  border: none;
  border-radius: 5px;
  background: lightcyan;
}

.args {
  border-top: 2px solid #eee;
  padding-top: 15px;
  grid-column: 1/3;
}

input[type="text"] {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #aaa;
}

</style>

