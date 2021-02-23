export default class Board {
    constructor() {
      this.cells = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    }
    /**
     * @param x The x location
     * @param y The y location
     * @param player The player either 'x' or 'o'
     * @returns {boolean} True if successful, False if invalid move.
     */
    doMove(x, y, player) {
      if (this.cells[x][y] !== '') {
        return false;
      }
  
      this.cells[x][y] = player;
      return true;
    }

    getScore() {
     if (this.playerHas3InARow('x')) {
       return -100
     } 
     if (this.playerHas3InARow('o')) {
       return 100
     } 
      return 0;
    } 
    playerHas3InARow(player) {
      // Horizontal rows
      for (let i=0; i<3; i++) {
        if (this.cells[0][i] === player &&
            this.cells[1][i] === player &&
            this.cells[2][i] === player) {
          return true;
        }
      }
  
      // Vertical rows
      for (let i=0; i<3; i++) {
        if (this.cells[i][0] === player && 
            this.cells[i][1] === player && 
            this.cells[i][2] === player) {
          return true;
        }
      }
  
      // Diagonals
      if (this.cells[0][0] === player && 
          this.cells[1][1] === player &&
          this.cells[2][2] === player) {
        return true;
      }
      if (this.cells[2][0] === player && 
          this.cells[1][1] === player && 
          this.cells[0][2] === player) {
        return true;
      }
  
      return false;
    }
//checks if the game ended — i.e. if there is a 3 in a row or if the board is full.
    isGameOver() {
      return this.getPossibleMoves().length === 0 || 
              this.playerHas3InARow('x') || 
              this.playerHas3InARow('o');
    }
//returns a copy of the board 
    clone() {
      let clone = new Board();
  
      for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          clone.cells[i][j] = this.cells[i][j];
        }
      }
  
      return clone;
    }
  //returns an array of objects containing an x and y field
  // denoting the empty cells on the board.
    getPossibleMoves() {
      let moves = [];
      for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          if (this.cells[i][j] === '') {
            moves.push({x: i, y: j});
          }
        }
      }
      return moves;
    }
  }