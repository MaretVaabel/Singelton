<template>
  <div>
      <div v-if="!playAgainst" class="multiplay">
          <button class='btn' @click="playAgainst = 'computer'">Play with computer</button>
          <button class='btn' @click="playAgainst = 'multiplayer'">Multiplayer</button>
      </div>
          
      <div v-else class="tictactoe-board">
        <div v-for="(n, i) in 3" :key="i">
          <div v-for="(n, j) in 3" :key="j">
          <cell @click="move(i, j)" :value="board.cells[i][j]"></cell>
        </div>
      </div>
      <div class="buttons">
          <button class="btn" @click="newGame">Restart the game</button>
          <button class="btn" @click="changeThePlayer">Change player</button>
       </div>
      <div class="game-over-text" v-if="gameOver">
        {{ gameOverText }}
      </div>
     </div>
  </div>
</template>

<script>
import Board from "./Board";

  export default {
    data() { 
      return {
        gameOver: false,
        gameOverText: '',
        board: new Board(),
        playAgainst: '',
        player: 'x'
      } 
    },
    methods: {
      newGame(){
       this.board = new Board()
       this.gameOver = false
       this.gameOverText = ''
       this.player = 'x'
      },
      changeThePlayer(){
        this.playAgainst = ''
        this.newGame()
        
      },
      move(i, j) {
        if (this.gameOver) {
          return;
        }
        if(!this.board.doMove(i, j, this.player)) {
          //Invalid
          return;
        }
        this.$forceUpdate();

        if (this.board.isGameOver()) {
          this.gameOver = true;
          this.gameOverText = this.board.playerHas3InARow('x') ? 'You win!' : 
                              this.board.playerHas3InARow('o') ? 'Second player win!' : 
                              'Draw';
          return;
        }
        if(this.playAgainst === 'computer'){
            //computer moves
            let aiMove = this.minimax(this.board.clone(), 'o');
            this.board.doMove(aiMove.move.x, aiMove.move.y, 'o');
            
            if (this.board.isGameOver()) {
              this.gameOver = true;
              this.gameOverText = this.board.playerHas3InARow('o') ? 'You lose!' : 'Draw';
            }
            this.$forceUpdate();   
        }
        if(this.playAgainst === 'multiplayer'){       
          this.board.doMove(i, j, this.player);
          this.player = this.player === 'x' ? 'o' : 'x'
        }
      },

      minimax(board, player, depth = 1) {
        // If the board has 3 in a row return the score of the board.
        if (board.isGameOver()) {
          return {
            score: board.getScore() + depth,
            move: null
          }
        }

        // The 'o' player wants to maximize its score, the 'x' player wants to
        // minimize its score
        let bestScore = player === 'o' ? -10000 : 10000;
        let bestMove = null;

        let moves = board.getPossibleMoves();
        for (let i = 0; i < moves.length; i++) {
          let move = moves[i];
          let newBoard = board.clone();
          newBoard.doMove(move.x, move.y, player);

          // Recursively call the minimax function for the new board.
          const score = this.minimax(newBoard, player === 'x' ? 'o' : 'x', depth + 1).score;

          // If the score is better than the best saved score update the best saved
          // score to this move.
          if ((player === 'o' && score > bestScore) || (player === 'x' && score < bestScore)) {
            bestScore = score;
            bestMove = move;
          }
        }

        // Return the best found score & move!
        return {
          score: bestScore,
          move: bestMove
        }
      }
    }
  }
</script>

<style scoped>
  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    width: 390px;
    height: 390px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: white;
    
  }
  .btn {
    background-color: lightblue;
    margin: 10px 5px;
    border-radius: 5%;
    padding: 10px;
    display: inline-block;
    font-size: 20px;
  }
  
  .game-over-text{
    font-size: 50px;
    padding: 5px 10px;
    font-weight: 400;
    position: relative;
    animation-name: example;
    animation-duration: 4s;
    animation-direction: forwards;
    transition: font-size 12s;
  }
  @keyframes example {
    from {top: 0px;}
    to {top: -250px; font-size: 60px; font-weight: 800;}
}
</style>