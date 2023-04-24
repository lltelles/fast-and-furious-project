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
        this.speedX = 0; 
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
        if(this.x <= 0){
            this.x = 0;
        } else if (this.x + 40 >= 700){
            this.x = 660; // => 700-40
        }
        this.x += this.speedX;
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