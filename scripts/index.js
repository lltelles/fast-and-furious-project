console.log('JS is loaded')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new Component((canvas.width / 2) - 20, 420, 40, 70, true, null, ctx);


window.onload = () => {
    document.getElementById('start-btn').onclick = () => {

    //Load of Player
    const player = new Image();
    player.src="images/red-tank.png"

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
       //Draw Player and Background and SCore Tab

        
    }

    let x=0;
    let y=0;
    let vx =0;
    let vy=0;

    document.addEventListener('keydown', (e)=>{
      switch (e.code){
        case 'ArrowLeft': player.vx -=1; break;
        case 'ArrowRight': player.vx +=1; break; 
        case 'ArrowUp': player.vy -=1; break; 
        case 'ArrowDown': player.vy +=1; break; 
      }
    });
  
    document.addEventListener('keyup', (e)=>{
      switch (e.code){
        case 'ArrowLeft': player.vx = 0; break;
        case 'ArrowRight': player.vx = 0; break; 
        case 'ArrowUp': player.vy = 0; break; 
        case 'ArrowDown': player.vy = 0; break; 
      }
    })
  