class Game {
  constructor(ctx, width, height, player) {
    // Canvas
    this.ctx = ctx;
    // Canvas Width, Height
    this.width = width;
    this.height = height;
    // Player
    this.player = player;
    // Obstacles / Enemies
    this.enemies = [];
    // SetInterval
    this.intervalId = null;
    // Frames
    this.frames = 0;
    // Score
    this.score = 0;
    //Lives (between 1 and 3)
    this.lives = 3;
    //Level (goes from 1 to 3)
    this.level = 1;
  }

  // Start Function
  start() {
    this.intervalId = setInterval(this.update, 10);
  }

  // Stop Function
  stop() {
    clearInterval(this.intervalId);
  }

  // Arrow Function that Updates the Game Logic
  update = () => {
    // Updating Frames
    this.frames++; // 100 * 10 = 1s ; 200 * 10 = 2s
    // Updating Score
    this.score += 1;
    // Updating Lives
    this.updateLevel();
    this.lives;
    // Updating Level
    this.level;
    // Clearing the Canvas
    this.clear();
    // Create our Background
    this.createBackground();
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    this.checkGameOver();
    this.checkWin();
  };

  // Clear Background
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  createBackground() {
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
    });

    img.src = "../images/road.png";
    this.ctx.drawImage(img, 0, 40, this.width, this.height - 40);

    //Information Bar
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, 40);

    //Score value
    ctx.fillStyle = "white";
    ctx.font = "15px custom-font3";
    ctx.fillText(`Score: ${this.score}`, 5, 25);

    //Lives value
    ctx.fillStyle = "white";
    ctx.font = "15px custom-font3";
    ctx.fillText(`Lives: ${this.lives}`, 300, 25);

    //Level value
    ctx.fillStyle = "white";
    ctx.font = "15px custom-font3";
    ctx.fillText(`Level: ${this.level}`, 580, 25);
  }
  updateLevel() {
    if (this.frames % 3000 === 0) {
      this.level++;
    }
  }

  updateEnemies() {
    //Enemies Starting Positions
    let starterHeight = 40;
    let randomX = Math.floor(Math.random() * (rightLimit - leftLimit));

    //List of Enemies
    const policeCar = new Component(
      leftLimit,
      starterHeight,
      100,
      40,
      true,
      "../images/police-car.png.png",
      ctx
    );
    const helicopter = new Component(
      leftLimit,
      starterHeight,
      100,
      40,
      true,
      "../images/helicopter.gif",
      ctx
    );

    //checkpoint Enemy
    const barrierL = new Component(
      leftLimit,
      starterHeight,
      200,
      20,
      true,
      "../images/cops-car.png",
      ctx
    );
    const barrierR = new Component(
      rightLimit - 200,
      starterHeight,
      200,
      20,
      true,
      "../images/cops-car.png",
      ctx
    );

    const enemiesList = [policeCar, policeCar, policeCar, policeCar];

    // Enemies movement
    for (let i = 0; i < this.enemies.length; i++) {
      // enemies's y ++
      this.enemies[i].y += 1 * this.level;
      // enemies' draw function
      this.enemies[i].draw();
    }
    //level 1 difficulty from Start to 28seconds
    if (this.frames < 2801) {
      // each 2 seconds, a enemy is added to the array
      if (this.frames % 200 === 0) {
        let randomEnemy = Math.floor(Math.random() * enemiesList.length);
        // Give a random position to the enemy
        enemiesList[randomEnemy].x += randomX;
        // Push enemy into enemy array
        this.enemies.push(enemiesList[randomEnemy]);
      }
    }
    // Level 1 final boss at 30 seconds
    if (this.frames % 3000 === 0) {
      this.enemies.push(barrierL, barrierR);
    }

    //level 2 difficulty
    if (this.frames > 3100 && this.frames < 5800) {
      if (this.frames % 200 === 0) {
        let randomEnemy = Math.floor(Math.random() * enemiesList.length);
        // Give a random position to the enemy
        enemiesList[randomEnemy].x += randomX;
        // Push enemy into enemy array
        this.enemies.push(enemiesList[randomEnemy]);
      }
    }

    // Level 2 final boss at 30 seconds
    if (this.frames % 6000 === 0) {
      this.enemies.push(barrierL, barrierR);
    }

    //level 3 difficulty
    if (this.frames > 6100 && this.frames < 8800) {
      if (this.frames % 200 === 0) {
        let randomEnemy = Math.floor(Math.random() * enemiesList.length);
        // Give a random position to the enemy
        enemiesList[randomEnemy].x += randomX;
        // Push enemy into enemy array
        this.enemies.push(enemiesList[randomEnemy]);
      }
    }
    // Level 2 final boss at 30 seconds
    if (this.frames % 9000 === 0) {
      this.enemies.push(barrierL, barrierR);
    }
  }

  checkWin() {
    if (this.score === 200) {
      this.ctx.globalAlpha = 0.8;
      this.ctx.fillStyle = "black";
      ctx.fillRect(131, 124, 442, 392);
      ctx.font = "50px custom-font2";
      ctx.fillStyle = "#28E010";
      ctx.fillText("YOU WIN", 215, 250);
      ctx.font = "20px custom-font4";
      ctx.fillStyle = "white";
      ctx.fillText("Congrats! You've helped Dom", 185, 320)
      ctx.fillText("to find his family.", 230, 350)
      ctx.font = "bold 20px custom-font3";
      ctx.fillStyle = "white";
      ctx.fillText("final score", 250, 440);
      this.ctx.fillText(`${this.score}`, 320, 475);

      this.stop();
    }
  }
  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      if (this.lives > 1) {
        let enemyId = this.enemies.map((enemy) => {
          return this.player.crashWith(enemy);
        });
        let position = enemyId.indexOf(true);
        this.enemies.splice(position, 1);

        this.lives --;
      } else {
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillStyle = "black";
        ctx.fillRect(131, 124, 442, 392);
        ctx.font = "50px custom-font2";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", 160, 250);
        ctx.font = "bold 20px custom-font3";
        ctx.fillStyle = "white";
        ctx.fillText("FINAL SCORE", 250, 350);
        this.ctx.fillText(`${this.score}`, 320, 400);
        this.stop();
      }
    }
  }
}


