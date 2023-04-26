console.log('JS is loaded')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Game Canvas Limits
let leftLimit = 115;
let rightLimit = 585;

//Player Creation
const player = new Component((canvas.width / 2) - 23, 500, 45, 85, true, '../images/top view mustang black.png', ctx);

//const backgroundImage = new Component(0,40,canvas.width,canvas.height-40,true,"../images/road.png",ctx);


window.onload = () => {
    document.getElementById('start-btn').onclick = () => {
    startGame();
    };
}

    function startGame() {
    // Create a Game Board
    const game = new Game(ctx, canvas.width, canvas.height, player);
    // Call a function of Game Board's called Start.
    game.start();
    
    }

    //Movement of the player speed definition
    document.addEventListener('keydown', (e)=>{
      switch (e.code){
        case 'ArrowLeft': player.vxl =-3; break;
        case 'ArrowRight': player.vxr =3; break; 
        case 'ArrowUp': player.vy =-3; break; 
        case 'ArrowDown': player.vy =3; break; 
      }
    });
  
    document.addEventListener('keyup', (e)=>{
      switch (e.code){
        case 'ArrowLeft': player.vxl = 0; break;
        case 'ArrowRight': player.vxr = 0; break; 
        case 'ArrowUp': player.vy = 0; break; 
        case 'ArrowDown': player.vy = 0; break; 
      }
    })
  