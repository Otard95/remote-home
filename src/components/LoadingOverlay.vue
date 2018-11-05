<template>
  <div class="loading-overlay">
    <Spinner v-if="showSpinner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Spinner from '@/components/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class LoadingOverlay extends Vue {
  @Prop(Boolean)
  private showSpinner?: boolean;

}
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

