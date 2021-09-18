<template>
  <div class="app-layout">
    <main-navigation v-if="isUserLoggedIn" class="app-layout__nav" />
    <main class="app-layout__content-wrapper">
      <router-view class="app-layout__content" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainNavigation from '@/components-base/main-navigation/main-navigation.vue';

@Component({
  components: {
    MainNavigation,
  },
})
export default class AppLayout extends Vue {
  private get isUserLoggedIn(): boolean {
    return this.$store.getters['auth/isUserLoggedIn'];
  }
}
</script>
<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__nav {
    flex-shrink: 0;
  }
  &__content-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: calc(100% - 80px);
  }
  &__content {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f9fafd;
  }
}
</style>
