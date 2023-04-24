class Component {
    constructor(x,y,w,h,img,color,ctx){
        // Prompting X,Y,Width,Height of the Component
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h;
        this.img = img;
        this.color = color; 
        this.ctx = ctx; 

        // Speed of the Component
        this.vx = 0;
        this.vy = 0; 
    }

    // Draw Function 
    draw(source){
        // If it's an Image
            if(this.img){
                // Creating new Image and Load
                const img = new Image();
                img.addEventListener('load', ()=>{
                    this.img = img;
                })
                // Source Image
                img.src = source;
                this.ctx.drawImage(img, this.x, this.y,this.w, this.h);
            } else{
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.w, this.h);
            }
    }

    // New Position Function 
    newPos(){
        // X Axis Bounderies
        let leftLimit = 115;
        let rightLimit = 585;
        //Bounderies + movement in the X Axis
        if(this.x <= leftLimit) {this.x = leftLimit;} 
        else if (this.x + this.w >= rightLimit) {this.x = rightLimit-this.w;}
        this.x += this.vx;
        console.log(this.x)

        // Y Axis Bounderies
        let upLimit = canvas.height/3;
        let bottomLimit = canvas.height-10;
        //Bounderies + movement in the X Axis
        if(this.y <= upLimit) {this.y = upLimit;} 
        else if (this.y + this.h >= bottomLimit) {this.y = bottomLimit-this.h;}
        this.y += this.vy;
    }
    // Defining the borders of the player
    top(){return this.y;}
    bottom(){return this.y + this.h;}
    left(){return this.x;}
    right(){return this.x + this.w;}

    // Crash function with Enemies
    crashWith(enemy){
        return(this.top()<enemy.bottom()&&
        this.right()>enemy.left()&&
        this.left()<enemy.right()&&
        this.bottom()>enemy.top())
    }
/*
    // Crash function with Friends
    crashWith(friend){
        return(this.top()<enemy.bottom()&&
        this.right()>enemy.left()&&
        this.left()<enemy.right()&&
        this.bottom()>enemy.top())
    }*/

}