<template>
  <div class="device-variable">
    <h3>{{VariableName}}</h3>
    <span>{{variableType}}</span>
    <p>{{variable_value}}</p>
    <button 
      v-bind:class="{running : refresh_in == 0}"
      @click="GetValue"
      @mouseover="SetButtenHover(true)"
      @mouseout="SetButtenHover(false)"
    >{{RefreshButtonText}}</button>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ParticleService from '@/Services/ParticleService';

@Component
export default class DeviceVariable extends Vue {
  
  @Prop(String) private deviceId?: string;
  @Prop(String) private variableName?: string;
  @Prop(String) private variableType?: string;
  private variable_value: string | number | boolean = '';
  private refresh_in: number = 0;
  private refresh_button_hover: boolean = false;
  
  constructor () {
    super();
    this.GetValue();
    setInterval(this.DecrimentRefreshTimer.bind(this), 1000);
  }
  
  private get VariableName (): string {
    if (!this.variableName) { return 'Unnamed function'; }
    return this.variableName.replace(
      /([A-Z]|^\w)/g,
      (_, _1: string) => ' ' + _1.toUpperCase(),
    ).slice(1);
  }
  
  private SetButtenHover (state: boolean): void {
    this.refresh_button_hover = state;
  }
  
  private get RefreshButtonText (): string {
    if (this.refresh_in === 0) {
      return 'Refreshing...';
    }
    if (this.refresh_button_hover) {
      return 'Refresh now!';
    }
    return `Refresh in ${this.refresh_in}`;
  }
  
  private async GetValue () {
    
    this.refresh_in = 0;
    ParticleService.Instance.Particle.getVariable({
      auth: ParticleService.Instance.Token,
      deviceId: this.deviceId,
      name: this.variableName,
    })
    .then(res => {
      this.variable_value = res.body.result;
      this.refresh_in = 30;
      setTimeout(this.GetValue.bind(this), this.refresh_in * 1000);
    });
    
  }
  
  private DecrimentRefreshTimer (): void {
    this.refresh_in = Math.max(0, this.refresh_in - 1);
  }
  
}
</script>

<style lang="scss" scoped>

.device-variable {
  display: grid;
  width: 500px;
  padding: 10px;
  margin: 0 auto 20px;
  border: 2px solid #eee;
  border-radius: 5px;
  
  align-items: center;
  row-gap: 10px;
  grid-template-columns: [varName] 1fr [type] 1fr [value] 2fr [reload] 1fr;
}

h3 {
  grid-area: varName;
  padding-left: 20px;
  text-align: left;
  white-space: nowrap;
}

span {
  grid-area: type;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
  color: #888;
}

p {
  grid-area: value;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  color: rgb(0, 94, 117);
}

button {
  grid-area: reload;
  width: 125px;
  height: 60%;
  border: none;
  border-radius: 5px;
  background: rgb(11, 153, 158);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
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

