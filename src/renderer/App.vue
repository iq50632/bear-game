<template>
<div id="app">
  <v-app style="background-color: rgba(121, 121, 121, 0);">
    <div class="my-auto">
      <router-view></router-view>
    </div>
  </v-app>
</div>
</template>

<script>
  export default {
    name: 'bear-game'
  }
</script>

<style>
  @font-face {
    font-family: 'MyFont';
    src: url('./assets/wt006.ttf') format('ttf');
    font-weight: 600;
    font-style: normal;
  }
  h1 {
    font-family: MyFont;
  }
  p {
    font-family: MyFont;
  }
  #app {
    font-family: MyFont, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow: hidden;
    color: #2c3e50;
  }

  .body {
    padding-top: 64px;
    font-family: MyFont;
    overflow: hidden;
  }

  .container {
    min-height: calc(100vh - 64px);
    padding: 0 !important;
    align-items: center;
    justify-content: center;
    display: flex;
  }
</style>
