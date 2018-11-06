<template>
  <div class="device-function">
    <h3>{{FunctionName}}</h3>
    <button @click="CallFunction" v-bind:class="{running : isExecuting}">Execute</button>
    <div class="args">
      <FunctionArg v-for="(arg, i) in func_arguments"
                   :key="i"
                   :func_arg="arg" />
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import FunctionArg from '@/components/FunctionArg.vue';
import ParticleService from '@/Services/ParticleService';
import Argument from '@/Models/Argument';

@Component({
  components: {
    FunctionArg,
  },
})
export default class DeviceFunction extends Vue {
  
  @Prop(String) private deviceId?: string;
  @Prop(String) private functionName?: string;
  @Prop(Boolean) private hasFunctionDescription?: boolean;
  private function_description?: string;
  private func_arguments: Argument<any>[] = [];
  private isExecuting: boolean = false;
  
  constructor () {
    super();
    
    if (!this.deviceId || !this.functionName) {
      throw new Error(`[DeviceFunction] Unspesified property!`);
    }
    if (this.hasFunctionDescription) {
      this.GetFunctionDetails();
    } else {
      this.func_arguments = [Argument.Parse('NONE')];
    }
    
  }
  
  private CallFunction (): void {
    
    this.isExecuting = true;
    const arg = this.func_arguments.map(a => a ? a.value : a).join(':');
    console.log(arg);
    
    ParticleService.Instance.Particle.callFunction(
        {
          auth: ParticleService.Instance.Token,
          deviceId: this.deviceId,
          name: this.functionName,
          argument: arg,
        },
      )
      .then(res => console.log(res.body.return_value))
      .finally(() => {
        this.isExecuting = false;
      });
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
    
    this.function_description.split(':').forEach(part => {
      this.func_arguments.push(Argument.Parse(part));
    });
    
  }
  
}
</script>

<style lang="scss" scoped>

.device-function {
  display: grid;
  width: 500px;
  padding: 10px;
  margin: 0 auto 20px;
  border: 2px solid #eee;
  border-radius: 5px;
  
  align-items: center;
  row-gap: 10px;
  grid-template-columns: 3fr 1fr;
}

h3 {
  padding-left: 20px;
  text-align: left
}

button {
  height: 60%;
  border: none;
  border-radius: 5px;
  background: rgb(11, 153, 158);
  font-size: 14px;
  font-weight: 600;
}

.args {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-top: 2px solid #eee;
  padding-top: 15px;
  grid-column: 1/3;
}

.running {
  background: radial-gradient(rgb(3, 155, 243), rgb(13, 223, 160));
	background-size: 400% 400%;
  animation: working 4s linear infinite;
}

@keyframes working {
  0% {
		background-position: 0% 0%
	}
	25% {
		background-position: 100% 0%
	}
  50% {
    background-position: 50% 50%
  }
  75% {
    background-position: 0% 100%
  }
	100% {
		background-position: 0% 0%
	}
}

</style>

