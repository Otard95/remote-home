<template>
  <div class="spinner">
    <div class="inner"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class Spinner extends Vue {
}
export default Spinner
</script>

<style lang="scss" scoped>

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: conic-gradient(rgb(47, 136, 163) 30%, cyan 100%);
  animation: spinn 2s ease-in-out infinite;
}

.inner {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: rgb(7, 160, 53);
  animation: pulse 2s ease-in-out 0.5s infinite;
}

@keyframes spinn {
  from {
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(720deg);
  }
  to {
    transform: rotate(720deg)
  }
}

@keyframes pulse {
  from {
    height: 30px;
    width: 30px;
  }
  50% {
    height: 102px;
    width: 102px;
  }
  to {
    height: 30px;
    width: 30px;
  }
}

</style>
