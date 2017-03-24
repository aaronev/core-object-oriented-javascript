//attempted, but couldn't finish
//not sure if any of this is right
//I'm still trying to understand OOPS
//Got confused between JS and CSS animation 
//Check out this website to see how far I got:
//https://preview.c9users.io/ay3ism3/projects/Games/games.html

var Board = function() { 
//created board to help visualize
    this.rows = [1, 2, 3, 4, 5, 6]
//maybe assign each image a row and column in html
    this.column = [1, 2, 3, 4, 5]
}

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.row = Math.floor(Math.random() * (3 - 6)) + 3
    this.column = Math.floor(Math.random() * (1 - 6)) + 1
}

Enemy.prototype.update = function(dt) {
    this.row += (this.speed) * dt;
    Enemy.forEach(function(enemy, index) {
        if(overlap(enemy, player)) {
            updateScore("died");
            player.column = 380;
        }
    })
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.row, this.column);
}

Enemy.generateEnemies = function() {
    allEnemies.push(new Enemy());
    Enemy.removeOffScreenEnemies();
    var delay;
    if(score >= 200) {
        delay = Helper.returnRandomValue([0, 200, 500, 750]);
    } else {
        delay = Helper.returnRandomValue([0, 500, 750, 1000]);
    }
    setTimeout(Enemy.generateEnemies, delay);
}

Enemy.removeOffScreenEnemies = function() {
    allEnemies.forEach(function(enemy, index) {
        if(enemy.x > 505) {
            allEnemies.splice(index, 1);
        }
    })
}

Enemy.generateEnemies();

var Player = function(image) {
    this.playerIcon = image
    this.row = 1
    this.column = Math.floor(Math.random() * 5) + 1
    this.width = 171;
    this.height = 101;
}

let player1 = new Player('images/char-boy.png')
let player2 = new Player('images/char-cat-girl.png')
let player3 = new Player('images/char-horn-girl.png')
let player4 = new Player('images/char-pink-girl.png')
let player5 = new Player('images/char-princess-girl.png')
let players = [player1, player2, player3, player4, player5]

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerIcon), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    if(keyCode === 'left') {
        if(this.row - 101 < 0) {
            this.row = 0;
        } else {
        this.row -= 100;
        }
    } else if(keyCode == 'up') {
        if(this.column - 85 < 0) {
            Helper.updateScore("water");
            this.column = 380;
        } else {
            this.column -= 85;
        }
    }else if(keyCode == 'right') {
        if(this.row + 101 > 400) {
            this.row = 400;
        } else {
            this.row = 400;
        }
    }else if(keyCode == 'down') {
        if(this.column + 85 > 380) {
            this.column = 300;
        }else {
            this.column += 85
        }
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };
    player.handleInput(allowedKeys[e.keyCode]);
})
