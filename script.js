const board = document.querySelector('.board');
const StartButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const blockheight = 50;
const blockwidth = 50;

const cols = Math.floor (board.clientWidth/blockwidth);
const rows = Math.floor(board.clientHeight/blockheight)

let intervalId = null;
let food = {x:Math.floor((Math.random()*rows)), y:Math.floor(Math.random()*cols)}

const blocks = [];
const snake = [
    {x:4,y:3},
    {x:4,y:4},
    // {x:4,y:5}
]
let direction = 'down'

for(let i=0; i< rows*cols ; i++){
    const block = document.createElement('div')
    block.classList.add("block")
    board.appendChild(block);

}

for(let row =0; row<rows ; row++){
    for(let col = 0; col<cols; col++){
        const block = document.createElement('div')
        block.classList.add("block")
        board.appendChild(block);
        block.innerText = (`${row}-${col}`); // for marking the blocks
        blocks[`${row}-${col}`] = block;
    }
}

function render (){

    let head = null
    
    blocks[`${food.x}-${food.y}`].classList.add("food")

    if(direction === 'left'){
        head = {x: snake[0].x, y: snake[0].y - 1}
    }else if(direction === 'right'){
        head = {x: snake[0].x, y: snake[0].y + 1}
    }else if(direction === 'up'){
        head = {x: snake[0].x - 1, y: snake[0].y}
    }else if(direction === 'down'){
        head = {x: snake[0].x + 1, y: snake[0].y}
    }
 
        //food logic
    if (head.x === food.x && head.y === food.y) {
        // Ate food! Remove old food class and make new food
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[`${food.x}-${food.y}`].classList.add("food");
        
        snake.unshift(head);
    } 

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })
    snake.unshift(head)
    snake.pop()
    snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })

    if(head.x<0 || head.y <0 || head.x >=rows|| head.y >=cols){
        alert("GAME OVER")
        clearInterval(intervalId)
    }

}

intervalId = setInterval(() => {
    render();
}, 300);

StartButton.addEventListener("click", () => {
    modal.style.display = "none"
    intervalId = setInterval(() => {
        render()
    })
})

addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp' && direction !== 'down'){
        direction = 'up'
    }else if(e.key === 'ArrowDown' && direction !== 'up'){
        direction = 'down'
    }else if(e.key === 'ArrowLeft' && direction !== 'right'){
        direction = 'left'
    }else if(e.key === 'ArrowRight' && direction !== 'left'){
        direction = 'right'
    }
})