const gameboard = {
    winsX: 0,
    winsO: 0, 
    board: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    winningCombos: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]              
    ],
    currentPlayer: 'X',
    winmsg: document.querySelector('.winmsg'),
    displayBoard: function () {
        const container = document.querySelector('#container');
        if(!container) {
            console.log("Container not found");
            return
        }

        container.innerHTML = '';

        for (let i = 0; i < this.board.length; i++) {
            let cell = document.createElement('div');
            cell.textContent = this.board[i];
            cell.classList.add("cell")
            cell.id = "cell-" + i
            container.appendChild(cell)
        }
    },
    addEvents: function () {
        let cell = document.querySelectorAll('.cell')
        cell.forEach(item => {
            item.addEventListener('click', this.cellClicked.bind(this, item))
        }); 
    },
    cellClicked: function(cell) {
        let cellIndex = parseInt(cell.id.split('-')[1]);
    
        // Check if cell is already occupied
        if (this.board[cellIndex] !== 'X' && this.board[cellIndex] !== 'O') {
            // Update the cell and the game board
            this.board[cellIndex] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
    
            // Check for a win or a tie
            if (this.checkForWin(this.currentPlayer)) {
                this.displayWinMessage(this.currentPlayer);
                return;
            } else if (this.checkForTie()) {
                this.displayTieMessage();
                return;
            }
    
            // Switch players
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
    },
    
    checkForWin: function checkForWin(currentPlayer) {
        return this.winningCombos.some(combo => {
            return combo.every(index => {
                return this.board[index] === currentPlayer
            })
        })
    },
    checkForTie: function checkForTie() {
        return this.board.every(cell => cell === 'X' || cell === 'O');
    },
    displayWinMessage: function displayWinMessage(currentPlayer) {
        console.log("Player " + currentPlayer + " wins!");
        if (currentPlayer === 'X') {
            this.winsX++;
        } else {
            this.winsO++;
        }
        this.checkSeriesWinner();
    },
    displayTieMessage: function displayTieMessage() {
        console.log("The Game is a Tie");
    },
    startGame: function () {
        this.displayBoard();
        this.addEvents();
        return
    },
    checkSeriesWinner: function() {
        if (this.winsX === 3) {
            console.log("Player X wins the series!");
            this.winmsg.innerHTML = "Player X wins the Series!"
            // Handle series completion
        } else if (this.winsO === 3) {
            console.log("Player O wins the series!");
            this.winmsg.innerHTML = "Player O wins the Series!"
            // Handle series completion
        } else {
            this.resetBoardForNextGame();
        }
    },
    resetBoardForNextGame: function() {
        this.board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.currentPlayer = 'X'; // or choose based on some rule
        this.displayBoard();
        this.addEvents();
    }
}

gameboard.startGame()