<template>
  <div class="">
    <div>
      <main-logo />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLogo from '@/components/main-logo/main-logo.vue';

@Component({
  components: { MainLogo },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
