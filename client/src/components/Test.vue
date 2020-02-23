<template>
<h1>Test</h1>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Test',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  sockets: {
    connect: () => {
      console.log('socket connected');
    },
    customEmit: () => {
      console.log("Server emitted something");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
