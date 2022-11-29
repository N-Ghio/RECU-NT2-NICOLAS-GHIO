<template>
   <div class="container-fluid mt-3">
    <div class="jumbotron">
      <h1>Recuperatorio - PNT2</h1>
      <br>

      <Navegacion />
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
import Navegacion from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navegacion
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
