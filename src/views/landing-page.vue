<template>
  <div class="landing-page__wrapper">
    <div class="landing-page__nav">
      <main-logo />
      <div class="landing-page__auth-button" @click="toSignIn">
        <p>Sign In</p>
      </div>
    </div>
    <div class="landing-page__content">
      <div class="landing-page__desc">
        <span>
          Add you fav songs to our library and listen to it on your mobile
          devices.
        </span>
      </div>

      <p class="landing-page__link">
        <router-link to="/sign-in">Try now!</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLogo from '@/components/main-logo/main-logo.vue';

@Component({
  components: { MainLogo },
})
export default class extends Vue {
  private toSignIn() {
    this.$router.push('/sign-in').catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  &__wrapper {
    width: 100%;
    position: absolute;
    top: 20px;
  }
  &__nav {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 50px;
    align-items: center;
  }
  &__auth-button {
    border: 4px solid #000;
    align-items: center;
    height: 50px;
    line-height: 16px;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    cursor: pointer;
    & > p {
      font-family: Rockwell;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 16px;
      text-align: center;
      width: 120px;
    }
  }
  &__content {
    margin-top: 200px;
    margin-left: 50px;

    height: 69px;
    width: 434px;
    left: 67px;
    top: 173px;
    border-radius: nullpx;
  }
  &__link,
  &__desc {
    font-family: Rockwell;
    font-style: italic;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    text-align: left;
    color: #000000;
  }
}
</style>
