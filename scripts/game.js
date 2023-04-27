class Game {
  constructor(ctx, width, height, player, backgroundImage) {
    // Canvas
    this.ctx = ctx;
    // Canvas Width, Height
    this.width = width;
    this.height = height;
    // Player
    this.player = player;
    //Background
    this.backgroundImage = backgroundImage;
    this.bckgY = 40;
    // Obstacles / Enemies
    this.enemies = [];
    // Checkpoint
    this.checkpoint = [];
    // Perks/friends
    this.friends = [];
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
    // Game Sounds
    this.gameSound = new Audio("../soundtrack/02 Main Theme 1.mp3");
    this.gameSound.volume=0.5;
    this.gameSound.loop = false;

    this.gameOverSound = new Audio("../soundtrack/Game-Over-Sound.mp3");
    this.gameOverSound.loop = false;

    this.gameWinSound = new Audio("../soundtrack/Win-Sound.mp3");
    this.gameWinSound.loop = false;

    this.crashFriendSound = new Audio("../soundtrack/family-toretto.mp3");
    this.crashFriendSound.loop = false;

    this.crashExplosionSound = new Audio("../soundtrack/mixkit-8-bit-bomb-explosion-2811.wav");
    this.crashExplosionSound.volume=0.5;
    this.crashExplosionSound.loop = false;

    this.checkpointSound = new Audio("../soundtrack/checkpoint-sound.wav");
    this.checkpointSound.loop = false;
  }

  // Start Function
  start() {
    this.intervalId = setInterval(this.update, 10);
    this.gameSound.play();
  }

  // Stop Function
  stop() {
    clearInterval(this.intervalId);
    this.gameSound.pause();
    this.gameSound.currentTime = 0;
  }

  // Arrow Function that Updates the Game Logic every 10 milisecond
  update = () => {
    // Updates Frames
    this.frames++;
    // Checks collision with friends and updates score and lives
    this.updateScoreLives();
    // Updates Level
    this.updateLevel();
    // Clears the Canvas
    this.clear();
    // Create our Background
    this.updateBackground();
    //update player movement
    this.player.newPos();
    this.player.draw();
    //Update enemies creation and position
    this.updateEnemies();
    this.updateFriends();
    //Check for Win or Loss condition
    // Create our Information Bar
    this.createInfoBar();
    this.checkGameOver();
    this.checkWin();
    // Create our Information Bar
    this.createInfoBar();
  };

  // Clear Background
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  updateBackground() {
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
    });

    img.src = "../images/road.png";
    this.ctx.drawImage(img, 0, this.bckgY, this.width, this.height - 40);
    this.ctx.drawImage(
      img,
      0,
      this.bckgY - this.height + 40,
      this.width,
      this.height - 40
    );
    if (this.level === 1) {
      this.bckgY += 3;
    }
    if (this.level === 2) {
      this.bckgY += 4;
    }
    if (this.level === 3) {
      this.bckgY += 5;
    }

    if (this.bckgY >= this.height) {
      this.bckgY = 40;
    }
  }

  createInfoBar() {
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
  updateScoreLives() {
    const crashed = this.friends.some((friend) => {
      return this.player.crashWith(friend);
    });
    if (crashed) {
      let friendsId = this.friends.map((friend) => {
        console.log();
        return this.player.crashWith(friend);
      });

      let position = friendsId.indexOf(true);

      if (this.friends[position].type === "score") {
        this.score += 5000;
        this.crashFriendSound.play();
      } else if (this.friends[position].type === "lives") {
        this.lives++;
        this.crashFriendSound.play();
      }
      this.friends.splice(position, 1);
    } else {
      this.score++;
    }
  }
  updateLevel() {
    if (this.frames % 3000 === 0) {
      this.level++;
      this.checkpointSound.play();
    }
  }

  updateEnemies() {
    //Enemies Starting Positions
    let starterHeight = -50;
    let randomX = Math.floor(Math.random() * (rightLimit - leftLimit - 100));

    //List of Enemies
    const policeCar = new Component(leftLimit, starterHeight,50,100,true,"../images/cops-car-vertical-down.png",ctx);
    const submarine = new Component(leftLimit,starterHeight,100,80,true,"../images/submarine.png",ctx);
    const helicopter = new Component(leftLimit,starterHeight,90,90,true,"../images/helicopter.png",ctx);
    const tank = new Component(leftLimit,starterHeight,90,90,true,"../images/tank.png",ctx);

    const enemiesList = [helicopter,policeCar,submarine,tank,policeCar,helicopter,policeCar];

    //checkpoint Enemy
    //level 1
    const barrierL1 = new Component( leftLimit, starterHeight, 100, 40, true, "../images/cops-car.png", ctx );
    const barrierR1 = new Component( rightLimit - 100, starterHeight, 100, 40, true, "../images/cops-car.png", ctx );
    //level 2
    const barrierL2 = new Component( leftLimit, starterHeight, 150, 40, true, "../images/cop-cars-barrier-2.png", ctx );
    const barrierR2 = new Component( rightLimit - 150, starterHeight, 150, 40, true, "../images/cop-cars-barrier-2.png", ctx );
    //level 3
    const barrierL3 = new Component( leftLimit, starterHeight, 200, 40, true, "../images/cop-cars-barrier-3.png", ctx );
    const barrierR3 = new Component( rightLimit - 200, starterHeight, 200, 40, true, "../images/cop-cars-barrier-3.png", ctx );

    // Enemies movement
    for (let i = 0; i < this.enemies.length; i++) {
      // enemies's y ++
      this.enemies[i].y += 1 * this.level;
      // enemies' draw function
      this.enemies[i].draw();
    }

    // Checkpoint movement
    for (let i = 0; i < this.checkpoint.length; i++) {
      // checkpoint's y ++
      if (this.level === 1) {
        this.checkpoint[i].y += 2;
      }
      if (this.level === 2) {
        this.checkpoint[i].y += 4;
      }
      if (this.level === 3) {
        this.checkpoint[i].y += 5;
      }
      // checkpoint draw function
      this.checkpoint[i].draw();
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
    if (this.frames === 3000) {
      this.checkpoint.push(barrierL1, barrierR1);
    }

    //level 2 difficulty
    if (this.frames > 3100 && this.frames < 5800) {
      if (this.frames % 120 === 0) {
        let randomEnemy = Math.floor(Math.random() * enemiesList.length);
        // Give a random position to the enemy
        enemiesList[randomEnemy].x += randomX;
        // Push enemy into enemy array
        this.enemies.push(enemiesList[randomEnemy]);
      }
    }

    // Level 2 final boss at 30 seconds
    if (this.frames === 6000) {
      this.checkpoint.push(barrierL2, barrierR2);
    }

    //level 3 difficulty
    if (this.frames > 6100 && this.frames < 8800) {
      if (this.frames % 80 === 0) {
        let randomEnemy = Math.floor(Math.random() * enemiesList.length);
        // Give a random position to the enemy
        enemiesList[randomEnemy].x += randomX;
        // Push enemy into enemy array
        this.enemies.push(enemiesList[randomEnemy]);
      }
    }
    // Level 2 final boss at 30 seconds
    if (this.frames === 8800) {
      this.checkpoint.push(barrierL3, barrierR3);
    }
  }

  updateFriends() {
    //Friends Starting Positions
    let starterHeight = -50;
    let randomX = Math.floor(Math.random() * (rightLimit - leftLimit - 100));
    //List of Friends
    const orangeCar = new Friend( leftLimit, starterHeight, 100, 70, "score", true, "../images/orange f&f.png", ctx );
    const domMustang = new Friend( leftLimit, starterHeight, 100, 70, "lives", true, "../images/dom-mustang.png", ctx );
    const friendsList = [orangeCar, domMustang];
    // Friends movement
    for (let i = 0; i < this.friends.length; i++) {
      // enemies's y ++
      this.friends[i].y += 2 * this.level;
      // enemies' draw function
      this.friends[i].draw();
    }

    // Draw Live friends
    if (this.frames === 2000 || this.frames === 5000 || this.frames === 7000) {
      let tempArray = [];
      tempArray.push(domMustang);
      tempArray[0].x += randomX;
      console.log(tempArray[0].type);

      // Push friend into friend array
      this.friends.push(tempArray[0]);
      console.log(tempArray);
    }
    // Draw Score friends
    if (this.frames % 1300 === 0) {
      let tempArray = [];
      tempArray.push(orangeCar);
      tempArray[0].x += randomX;
      console.log(tempArray[0].type);

      // Push friend into friend array
      this.friends.push(tempArray[0]);
    }
  }

  checkWin() {
    if (this.level === 4) {
      this.ctx.globalAlpha = 0.8;
      ctx.roundRect(131, 124, 442, 392, 10);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      ctx.font = "50px custom-font2";
      ctx.fillStyle = "#28E010";
      ctx.fillText("YOU WIN", 215, 250);
      ctx.font = "24px custom-font4";
      ctx.fillStyle = "white";
      ctx.fillText("Congrats! You've helped Dom", 160, 320);
      ctx.fillText("to find his family.", 205, 350);
      ctx.font = "bold 20px custom-font3";
      ctx.fillStyle = "white";
      ctx.fillText("final score", 250, 440);
      this.ctx.fillText(`${this.score}`, 320, 475);

      this.stop();
      this.gameWinSound.currentTime=45;
      this.gameWinSound.play();
    }
  }
  // adicionar colision com os checkpoints
  checkGameOver() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.player.crashWith(this.enemies[i]) && !this.enemies[i].exploded) {
        this.enemies[i].exploded = true;
        this.enemies[i].w = 80;
        this.enemies[i].h = 80;
        this.enemies[i].source = "../images/explosion.png";
        setTimeout(() => {
          this.enemies.splice(i, 1);
        }, 200);

        if (this.lives > 1) {
          this.crashExplosionSound.currentTime=0;
          this.crashExplosionSound.play();
          this.lives--;
        } else {
          this.ctx.globalAlpha = 0.8;
          ctx.roundRect(131, 124, 442, 392, 10);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          ctx.font = "48px custom-font2";
          ctx.fillStyle = "red";
          ctx.fillText("GAME OVER", 175, 250);
          ctx.font = "bold 20px custom-font3";
          ctx.fillStyle = "white";
          ctx.fillText("FINAL SCORE", 250, 350);
          this.ctx.fillText(`${this.score}`, 320, 400);
          this.stop();
          this.gameOverSound.play();
        }
      }
    }
    //Repeated Code for checkpoint crashes
    for (let i = 0; i < this.checkpoint.length; i++) {
      if (this.player.crashWith(this.checkpoint[i]) && !this.checkpoint[i].exploded) {
        this.checkpoint[i].exploded = true;
        this.checkpoint[i].w = 80;
        this.checkpoint[i].h = 80;
        this.checkpoint[i].source = "../images/explosion.png";
        this.crashExplosionSound.currentTime=0;
        this.crashExplosionSound.play();
        setTimeout(() => {
          this.checkpoint.splice(i, 1);
        }, 200);

        if (this.lives > 1) {
          this.lives--;
        } else {
          this.ctx.globalAlpha = 0.8;
          ctx.roundRect(131, 124, 442, 392, 10);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          ctx.font = "48px custom-font2";
          ctx.fillStyle = "red";
          ctx.fillText("GAME OVER", 175, 250);
          ctx.font = "bold 20px custom-font3";
          ctx.fillStyle = "white";
          ctx.fillText("FINAL SCORE", 250, 350);
          this.ctx.fillText(`${this.score}`, 320, 400);
          this.stop();
          this.gameOverSound.play();
        }
      }
    }

  }
}
