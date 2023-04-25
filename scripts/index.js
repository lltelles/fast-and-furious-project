console.log('JS is loaded')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Game Canvas Limits
let leftLimit = 115;
let rightLimit = 585;

//Assets Creation
const player = new Component((canvas.width / 2) - 20, 500, 40, 70, true, '../images/top view mustang black.png', ctx);



window.onload = () => {
    document.getElementById('start-btn').onclick = () => {
    //Load of Player
    

    //Load of the Background 
    const roadImage = new Image();
    roadImage.src='./images/road.png';
    

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
  