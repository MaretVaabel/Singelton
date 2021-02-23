<template>
  <div id="app">
    <h1>Tic-Tac-Toe</h1>
    <div class="container">
      <tic-tac-toe />
    </div>
    
  </div>
</template>

<script>
import TicTacToe from './components/TicTacToe.vue'

export default {
  name: 'app',
  components: { 
    TicTacToe 
  },

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10%;
  border: 2px solid gray;
  padding-top: 10%;
  padding-bottom: 30%;
  background-color: lightgray;
  border-radius: 5%;
  box-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  padding-top: 20px;
  font-size: 80px;
}


</style>
