const board = document.getElementById('game-board');
import { getSnakeHead, snakeIntersection, update as updateSnake, draw as drawSnake, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;

const checkDeath = () => {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

const update = () => {
    updateSnake();
    updateFood();
    checkDeath();
}

const draw = () => {
    board.innerHTML = '';
    drawSnake(board);
    drawFood(board);
}

const main = (time) => {

    if (gameOver) {
        if (confirm('You lost')) {
            window.location = '/'
        }
        return;
    }
    
    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (time - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    lastRenderTime = time;

    update()
    draw()
}


window.requestAnimationFrame(main);