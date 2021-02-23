import Vue from 'vue'
import App from './App.vue'
import TicTacToe from './components/TicTacToe'
import Cell from './components/Cell'

Vue.component('tic-tac-toe', TicTacToe);
Vue.component('cell', Cell);

new Vue({
  el: '#app',
  render: h => h(App)
})
