import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
let newSegments = 0;

const snakeBody = [
    {x: 10, y: 11}
];

export const update = () => {
    addSegments();

    const inputDirection = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = {...snakeBody[i]}
    }    
        
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export const draw = (gameBoard) => {
    snakeBody.forEach(segment => {
        const snakeEl = document.createElement('div');
        snakeEl.style.gridRowStart = segment.y;
        snakeEl.style.gridColumnStart = segment.x;
        snakeEl.classList.add('snake');

        gameBoard.appendChild(snakeEl)
    })
}

const addSegments = () => {
    for(let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    
    newSegments = 0;
}
export const expandSnake = (amount) => {
    newSegments += amount;
}

const equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

export const onSnake = (position, { ignoreHead = false } = {}) => {
    return snakeBody.some((segment, idx) => {
        if(ignoreHead && idx === 0) return false;
        return equalPositions(segment, position)
    })
}

export const getSnakeHead = () => snakeBody[0];

export const snakeIntersection = () => {
    return onSnake(snakeBody[0], {ignoreHead: true})
}