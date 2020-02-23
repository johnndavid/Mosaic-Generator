<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  line-height: .8em;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.user-view {
  background: rgb(79, 76, 76);
  background: -moz-linear-gradient(180deg, rgba(79, 76, 76, 1) 0%, rgba(129, 124, 124, 1) 50%, rgba(79, 76, 76, 1) 100%);
  background: -webkit-linear-gradient(180deg, rgba(79, 76, 76, 1) 0%, rgba(129, 124, 124, 1) 50%, rgba(79, 76, 76, 1) 100%);
  background: linear-gradient(180deg, rgba(79, 76, 76, 1) 0%, rgba(129, 124, 124, 1) 50%, rgba(79, 76, 76, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#4f4c4c", endColorstr="#4f4c4c", GradientType=1);
  background-color: #454343;
  height: 100vh;
}
</style>
