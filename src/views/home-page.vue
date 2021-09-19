<template>
  <div>
    <div class="home-page__header">
      <div @click="signOut" class="home-page__header__btn">Sign out</div>
    </div>
    <div class="home-page__content">
      <upload-file-block />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UploadFileBlock from '@/components/upload-file-block/upload-file-block.vue';

@Component({
  components: {
    UploadFileBlock,
  },
})
export default class extends Vue {
  private signOut() {
    this.$store.dispatch('auth/logOut');
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  &__header {
    &__btn {
      cursor: pointer;
    }
  }
}
</style>
