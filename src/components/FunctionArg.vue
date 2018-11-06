<template>
  <div class="function-arg">
    
    <div v-if="IsSelect" class="no-warp input-field no-border">
      <label v-if="IsSelect" for="select">{{func_arg.placeholder}}:</label>
      <select v-if="IsSelect" v-model="func_arg.value" id="select">
        <option v-for="(choice, i) in func_arg.choises"
                :key="i"
                :value="choice" >{{choice}}</option>
      </select>
    </div>

    <input v-if="IsString || IsAny" v-model="func_arg.value"
           :placeholder="func_arg.placeholder||'Argument'"
           type="text" id="text">

    <div v-if="IsNumber" class="no-warp input-field no-border">
      <label v-if="IsNumber" for="num">{{func_arg.placeholder}}:</label>
      <input v-if="IsNumber" v-model="func_arg.value" type="number" id="num">
    </div>

    <div v-if="IsBool" class="no-warp input-field no-border">
      <input v-if="IsBool" v-model="func_arg.value" id="check" type="checkbox">
      <label v-if="IsBool" for="check">{{func_arg.placeholder}}</label>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Argument from '@/Models/Argument';

@Component
export default class FunctionArg extends Vue {
  
  @Prop(Argument) private func_arg?: Argument<any>;

  constructor () {
    super();
    if (this.func_arg === undefined) {
      throw new Error('[FunctionArgument] Property is unidentified!');
    }
  }

  private get IsSelect (): boolean {
    if (!this.func_arg) { return false; }
    return this.func_arg.choises !== undefined;
  }
  private get IsString (): boolean {
    return this.func_arg ? this.func_arg.type === String.name && !this.IsSelect : false;
  }
  private get IsNumber (): boolean {
    return this.func_arg ? this.func_arg.type === Number.name : false;
  }
  private get IsBool (): boolean {
    return this.func_arg ? this.func_arg.type === Boolean.name : false;
  }
  private get IsAny (): boolean {
    return this.func_arg ? this.func_arg.type === 'null' : false;
  }

}
</script>

<style lang="scss" scoped>

input {
  margin: 0 5px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #aaa;
  font-size: 14px;
}

select {
  padding: 4px;
  border-radius: 3px;
  border: 1px solid #aaa;
  font-size: 14px;
}

label {
  display: block;
  white-space: nowrap;
}

input[type="number"] {
  width: 50px
}

input[type="checkbox"] {
  margin-top: 2px
}

.no-warp {
  white-space: nowrap;
}

.input-field {
  display: flex;
  align-items: center;
  height: 18px;
  padding: 4px;
  border-radius: 3px;
  border: 1px solid #aaa;
  font-size: 15px;
}

.no-border {
  border: none;
}

</style>

