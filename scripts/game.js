class Game {
    constructor(ctx, width, height, player){
        // Canvas
        this.ctx = ctx;
        // Canvas Width, Height
        this.width = width; 
        this.height = height;
        // Player
        this.player = player;
        // Obstacles / Enemies
        this.enemies = [];
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
    }

    // Start Function 
    start(){
        this.intervalId = setInterval(this.update, 10);
    }

    // Stop Function 
    stop(){
        clearInterval(this.intervalId);
    }

    // Arrow Function that Updates the Game Logic every 10 milisecond
    update = () => {
        // Updates Frames
        this.frames ++;
        // Checks colision with friends and updates score and lives
        this.updateScoreLives();
        // Updates Level
        this.updateLevel();
        // Clears the Canvas
        this.clear();
        // Create our Background
        this.createBackground();
        //update player movement
        this.player.newPos();
        this.player.draw();
        //Update enemies creation and position
        this.updateEnemies();
        this.updateFriends();
        //Check for Win or Loss condition
        this.checkGameOver();
        this.checkWin();
    }

    // Clear Background
    clear(){
        this.ctx.clearRect(0,0,this.width, this.height);
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
  updateScoreLives(){
    const crashed = this.friends.some((friend)=>{
        return this.player.crashWith(friend);
    });
    if(crashed){
        let friendsId = this.friends.map((friend)=>{
            console.log()
            return this.player.crashWith(friend);
        });
        
        let position = friendsId.indexOf(true);
                    
        if(this.friends[position].type==='score'){
            this.score += 5000;}
        else if(this.friends[position].type==='lives'){
                this.lives ++};
        this.friends.splice(position,1);       
    }
    else{this.score ++}
}
updateLevel(){
    if(this.frames % 3000 === 0){
        this.level ++}
    }


updateEnemies(){
    //Enemies Starting Positions
    let starterHeight = 40;
    let randomX = Math.floor(Math.random()*(rightLimit-leftLimit-100));
    
    //List of Enemies
    const policeCar = new Component(leftLimit,starterHeight,100,40, true,'../images/police-car.png.png',ctx);
    const policeCar2 = new Component(leftLimit,starterHeight,100,40, true,'../images/cops-car.png',ctx);
    const helicopter = new Component(leftLimit,starterHeight,100,100, true,'../images/helicopter.png',ctx);
    
    const enemiesList = [helicopter,policeCar, policeCar2, policeCar,policeCar2,policeCar2];
    
    //checkpoint Enemy
    //level 1
    const barrierL1 = new Component(leftLimit,starterHeight,100,40,true,'../images/cop-cars-barrier-4.png',ctx);
    const barrierR1 = new Component(rightLimit-100,starterHeight,100,40,true,'../images/cop-cars-barrier-4.png',ctx);
    //level 2
    const barrierL2 = new Component(leftLimit,starterHeight,150,40,true,'../images/cops-car.png',ctx);
    const barrierR2 = new Component(rightLimit-150,starterHeight,150,40,true,'../images/cops-car.png',ctx);
    //level 3
    const barrierL3 = new Component(leftLimit,starterHeight,200,40,true,'../images/cop-cars-barrier-4.png',ctx);
    const barrierR3 = new Component(rightLimit-200,starterHeight,200,40,true,'../images/cop-cars-barrier-4.png',ctx);

   
    // Enemies movement
    for (let i = 0; i<this.enemies.length; i++){
        // enemies's y ++
        this.enemies[i].y +=1*this.level; 
         // enemies' draw function
         this.enemies[i].draw();
        
    }
    //level 1 difficulty from Start to 28seconds
    if(this.frames < 2801){
        
        // each 2 seconds, a enemy is added to the array
        if(this.frames % 200 === 0){
            let randomEnemy = Math.floor(Math.random()*enemiesList.length)
            // Give a random position to the enemy
            enemiesList[randomEnemy].x +=randomX
            // Push enemy into enemy array
            this.enemies.push(enemiesList[randomEnemy]);
        }
    }
    // Level 1 final boss at 30 seconds
    if(this.frames % 3000 ===0) {
        this.enemies.push (barrierL1, barrierR1)
    }

    //level 2 difficulty
    if(this.frames>3100 && this.frames<5800){
        if(this.frames % 120 === 0){
            let randomEnemy = Math.floor(Math.random()*enemiesList.length)
            // Give a random position to the enemy
            enemiesList[randomEnemy].x +=randomX
            // Push enemy into enemy array
            this.enemies.push(enemiesList[randomEnemy]);
        }
    }

    // Level 2 final boss at 30 seconds
    if(this.frames % 6000 ===0) {
       this.enemies.push (barrierL2, barrierR2)
    }

    //level 3 difficulty
    if(this.frames>6100 && this.frames<8800){
        if(this.frames % 80 === 0){
            let randomEnemy = Math.floor(Math.random()*enemiesList.length)
            // Give a random position to the enemy
            enemiesList[randomEnemy].x +=randomX
            // Push enemy into enemy array
            this.enemies.push(enemiesList[randomEnemy]);
        }
    }
    // Level 2 final boss at 30 seconds
    if(this.frames % 8800 ===0) {
        this.enemies.push (barrierL3, barrierR3)}
}

updateFriends(){
    //Friends Starting Positions
    let starterHeight = 40;
    let randomX = Math.floor(Math.random()*(rightLimit-leftLimit-100));
    //List of Friends
    const orangeCar = new Friend(leftLimit,40,100,50,'score',true,'../images/orange f&f.png',ctx);
    const redTank = new Friend(leftLimit,40,50,70,'lives',true,'../images/red-tank.png',ctx);
    const friendsList = [orangeCar,redTank];
    // Firends movement
    for (let i = 0; i<this.friends.length; i++){
        // enemies's y ++
        this.friends[i].y +=1*this.level; 
         // enemies' draw function
         this.friends[i].draw();
    }

    // Draw Live friends
    if(this.frames === 500 || this.frames === 5000 || this.frames === 7000 ){
        let tempArray = [];
         tempArray.push(redTank);
         tempArray[0].x += randomX;
         console.log(tempArray[0].type);
        
        // Push friend into friend array
        this.friends.push(tempArray[0]);
        console.log(tempArray);
        }
    // Draw Score friends
    if(this.frames % 1300 === 0){
        let tempArray = [];
         tempArray.push(orangeCar);
         tempArray[0].x += randomX;
         console.log(tempArray[0].type);
        
        // Push friend into friend array
        this.friends.push(tempArray[0]);
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


