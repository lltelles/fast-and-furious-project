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

    // Arrow Function that Updates the Game Logic
    update = () => {
        // Updating Frames
        this.frames ++; // 100 * 10 = 1s ; 200 * 10 = 2s
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
    }

    // Clear Background
    clear(){
        this.ctx.clearRect(0,0,this.width, this.height);
    }

    createBackground(){
        const img = new Image();
        img.addEventListener('load', ()=>{
            this.img = img;
        });

        img.src= "../images/road.png";
        this.ctx.drawImage(img, 0, 40, this.width, this.height-40);
        
        //Information Bar
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, 40);

        //Score value
        ctx.fillStyle = 'white';
        ctx.font = '30px Helvetica';
        ctx.fillText(`Score: ${this.score}`, 80, 30)

        //Lives value
        ctx.fillStyle = 'white';
        ctx.font = '30px Helvetica';
        ctx.fillText(`Lives: ${this.lives}`, 300, 30)
        
        //Level value
        ctx.fillStyle = 'white';
        ctx.font = '30px Helvetica';
        ctx.fillText(`Level: ${this.level}`, 500, 30)

    }
    updateLevel(){
        if(this.frames % 3000 === 0){
            this.level ++}
        }

    
    updateEnemies(){
        //Enemies Starting Positions
        let starterHeight = 40;
        let randomX = Math.floor(Math.random()*(rightLimit-leftLimit));
        
        
        //List of Enemies
        const policeCar = new Component(leftLimit,starterHeight,100,40, true,'../images/police-car.png.png',ctx);
        const helicopter = new Component(leftLimit,starterHeight,100,40, true,'../images/helicopter.gif',ctx);
        
        //checkpoint Enemy
        const barrierL = new Component(leftLimit,starterHeight,200,20,true,'../images/cops-car.png',ctx);
        const barrierR = new Component(rightLimit-200,starterHeight,200,20,true,'../images/cops-car.png',ctx);
        
        const enemiesList = [policeCar, helicopter,policeCar, policeCar, policeCar];
       
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
            this.enemies.push (barrierL, barrierR)
        }

        //level 2 difficulty
        if(this.frames>3100 && this.frames<5800){
            if(this.frames % 200 === 0){
                let randomEnemy = Math.floor(Math.random()*enemiesList.length)
                // Give a random position to the enemy
                enemiesList[randomEnemy].x +=randomX
                // Push enemy into enemy array
                this.enemies.push(enemiesList[randomEnemy]);
            }
        }

        // Level 2 final boss at 30 seconds
        if(this.frames % 6000 ===0) {
           this.enemies.push (barrierL, barrierR)
        }

        //level 3 difficulty
        if(this.frames>6100 && this.frames<8800){
            if(this.frames % 200 === 0){
                let randomEnemy = Math.floor(Math.random()*enemiesList.length)
                // Give a random position to the enemy
                enemiesList[randomEnemy].x +=randomX
                // Push enemy into enemy array
                this.enemies.push(enemiesList[randomEnemy]);
            }
        }
        // Level 2 final boss at 30 seconds
        if(this.frames % 9000 ===0) {
            this.enemies.push (barrierL, barrierR)}
    }

    checkWin(){
        if(this.level===4){
            ctx.fillStyle = 'black';
            ctx.fillRect(100, 100, 400, 250);
            ctx.font = '32px Helvetica';
            ctx.fillStyle = 'green';
            ctx.fillText('You helped Dom get to his Family', 150, 300);
            ctx.fillStyle = 'white';
            ctx.fillText('Your final score', 135, 350);
            this.ctx.fillText(`${this.score}`, 230, 400);
            
            this.stop();
        }
        
    }
    checkGameOver(){
        const crashed = this.enemies.some((enemy)=>{
            return this.player.crashWith(enemy);
        });
        
        

        if(crashed){
            if (this.lives>1){
                let enemyId = this.enemies.map((enemy)=>{
                    return this.player.crashWith(enemy);
                })
                let position = enemyId.indexOf(true)
                this.enemies.splice(position,1)

                this.lives --
            }
            else{    
                ctx.fillStyle = 'black';
                ctx.fillRect(100, 100, 400, 250);
                ctx.font = '32px Helvetica';
                ctx.fillStyle = 'red';
                ctx.fillText('Game Over', 150, 300);
                ctx.fillStyle = 'white';
                ctx.fillText('Your final score', 135, 350);
                this.ctx.fillText(`${this.score}`, 230, 400);
                this.stop();
            }
        }

    }
}