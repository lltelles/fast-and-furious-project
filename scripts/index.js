console.log('JS is loaded')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {
    document.getElementById('start-btn').onclick = () => {
      startGame();
    };
}

    function startGame() {

        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, 25);

        const playerImage = new Image();
        playerImage.src="images/red-tank.png"

        const roadImage = new Image();
        roadImage.src='./images/road.png';
      
        roadImage.onload = function(){
          ctx.drawImage(roadImage, 0, 25, canvas.width, canvas.height - 25);
          ctx.drawImage(playerImage, (canvas.width / 2) - 20, 420, 40, 70);
        }
    }