<template>
  <div id="app">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
  height: 100%;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translate(-30px);
}

.router-leave-to {
  opacity: 0;
  transform: translate(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.router-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.router-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
