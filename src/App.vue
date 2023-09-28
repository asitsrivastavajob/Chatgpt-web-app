<!-- src/App.vue -->

<template>
  <div id="app">
    <ChatGPT />
  </div>
</template>

<script>
import ChatGPT from './components/ChatGPT.vue';

export default {
  components: {
    ChatGPT,
  },
};
</script>

<style>
/* Your global CSS styles here */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#app {
  text-align: center;
}
</style>
