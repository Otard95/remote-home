<template>
  <div class="loading-overlay">
    <Spinner />
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Spinner from '@/components/Spinner.vue'

@Component({
  components: {
    Spinner
  }
})
class LoadingOverlay extends Vue {
}
export default LoadingOverlay
</script>

<style lang="scss">

.loading-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
}

</style>

