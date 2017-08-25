// peymankazemian@forwardnetworks.com

class TicTacToe {
  constructor(config) {
    this.config = config;
    this.playerNumber = 0;
    this.chars = ['X', 'O'];
    this.players = {};
    this.winnerEl = document.getElementsByClassName(config.winner)[0];
    this.fieldEl = document.getElementsByClassName(config.field)[0];
    let startButtonEl = document.getElementsByClassName(config.startBtn)[0];

    startButtonEl.onclick = () => {
      this.start();
    };

    this.fieldEl.onclick = this.onClick.bind(this);
  }
  
  start() {
    this.fieldEl.classList.remove('hidden');
    this.players.X = document.getElementsByClassName(this.config.firstPlayer)[0].value;
    this.players.O = document.getElementsByClassName(this.config.secondPlayer)[0].value;
    this.size = parseInt(document.getElementsByClassName(this.config.size)[0].value);

    this.resetGame();
    this.draw();
  }

  onClick(ev) {
    const target = ev.target;
    if (target.tagName !== 'TD') {
      return;
    }

    let i = target.getAttribute('data-x'),
      j = target.getAttribute('data-y');
    if (!this.model[i][j].char) {
      this.model[i][j].char = this.chars[+this.playerNumber];
      this.draw();
      const winner = this.findWinner(i, j);
      if (winner) {
        this.showWinner(winner);
      }
      this.playerNumber = !this.playerNumber;
    }
  }

  resetGame() {
    this.winnerEl.innerHTML = '';
    this.model = [];
    for (let i = 0; i < this.size; i++) {
      let line = [];
      for (let i = 0; i < this.size; i++) {
        line.push({char: ''})
      }
      this.model.push(line);
    }
  }

  draw() {
    let html = '';
    for (let i = 0; i < this.size; i++) {
      html += '<tr>';
      for (let j = 0; j < this.size; j++) {
        html += `<td data-x="${i}" data-y="${j}">${this.model[i][j].char}</td>`;
      }
      html += '</tr>';
    }

    this.fieldEl.getElementsByTagName('table')[0].innerHTML = html;
  }
  
  findWinner(x, y) {
    x = parseInt(x);
    y = parseInt(y);

    const lookForChar = this.chars[+this.playerNumber];

    let winner = this.findInColumn(y, lookForChar);
    if (winner) {
      return winner;
    }

    winner = this.findInRow(x, lookForChar);
    if (winner) {
      return winner;
    }

    // find in diagonals
    if (x === y) {
      winner = this.findInDiagonal1(lookForChar);
      if (winner) {
        return winner;
      }
    }

    if ((x + y) === (this.size -1)) {
      winner = this.findInDiagonal2(lookForChar);
      if (winner) {
        return winner;
      }
    }
  }

  findInColumn(y, lookForChar) {
    let lookForCharCount = 0;

    for (let j = 0; j < this.size; j++) {
      if (this.model[j][y].char === lookForChar) {
        lookForCharCount++;
      }
    }
    if (lookForCharCount === this.size) {
      return this.getWinner();
    }
  }

  findInRow(x, lookForChar) {
    let lookForCharCount = 0;

    for (let i = 0; i < this.size; i++) {
      if (this.model[x][i].char === lookForChar) {
        lookForCharCount++;
      }
    }

    if (lookForCharCount === this.size) {
      return this.getWinner();
    }
  }

  findInDiagonal1(lookForChar) {
    let lookForCharCount = 0;

    for (let j = 0; j < this.size; j++) {
      if (this.model[j][j].char === lookForChar) {
        lookForCharCount++;
      }
    }
    if (lookForCharCount === this.size) {
      return this.getWinner();
    }
  }

  findInDiagonal2(lookForChar) {
    let lookForCharCount = 0;

    for (let j = 0; j < this.size; j++) {
      if (this.model[j][this.size - j - 1].char === lookForChar) {
        lookForCharCount++;
      }
    }
    if (lookForCharCount === this.size) {
      return this.getWinner();
    }
  }

  getWinner() {
    return 'winner ' + this.players[this.chars[+this.playerNumber]]
  }

  showWinner(winner) {
    this.winnerEl.innerHTML = winner;
  }
}

let ticTacToe = new TicTacToe({
  size: 'size',
  field: 'field',
  startBtn: 'startBtn',
  firstPlayer: 'firstPlayer',
  secondPlayer: 'secondPlayer',
  winner: 'winner'
});