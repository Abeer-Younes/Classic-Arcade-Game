var Enemy = function(x, y, speed) {
    this.icon = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = -100;
    }
    this.collision(this);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.icon), this.x, this.y);
};

Enemy.prototype.collision = function(enemy) {
    if (
        firPlayer.y + 131 >= enemy.y + 90 &&
        firPlayer.x + 25 <= enemy.x + 88 &&
        firPlayer.y + 73 <= enemy.y + 135 &&
        firPlayer.x + 76 >= enemy.x + 11) {
        firPlayer.x = 200;
        firPlayer.y = 300;
    }

    if (firPlayer.y + 63 <= 40) {
        firPlayer.x = 200;
        firPlayer.y = 300;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        firPlayer.score++;
        this.increaseEnem(firPlayer.score);
    }

};

Enemy.prototype.increaseEnem = function(numEnemies) {
    enemies.length = 0;
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(this.x * i, (Math.random() * 170) + 40, this.speed + (i * 50));
        enemies.push(enemy);
    }
};

var player = function(x, y, speed) {
    this.icon = "images/char-pink-girl.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = 0;
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.icon), this.x, this.y);
    ctx.fillStyle = 'black';
    ctx.font = "24px Arial";
    ctx.fillText('Score: ' + firPlayer.score, 0, 40);
};

player.prototype.update = function() {

};


player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        if (firPlayer.x > 0) {
            firPlayer.x -= firPlayer.speed;
        }
    }
    if (keyPress == 'up') {
        if (firPlayer.y > -60) {
            firPlayer.y -= firPlayer.speed - 20;
        }
    }
    if (keyPress == 'right') {
        if (firPlayer.x < 400) {
            firPlayer.x += firPlayer.speed;
        }
    }
    if (keyPress == 'down') {
        if (firPlayer.y < 380) {
            firPlayer.y += firPlayer.speed - 20;
        }
    }

};

var enemies = [];
var firPlayer = new player(200, 300, 100);
var enemy = new Enemy(-100, Math.random() * 150 + 60, 50);
enemies.push(enemy);


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    firPlayer.handleInput(allowedKeys[e.keyCode]);
});