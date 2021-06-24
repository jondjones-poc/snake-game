import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition} from './grid.js'

const EXPANSION_RATE = 1;

const getRandomFoodPosition = () => {
    let newFoodPosition;

    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }

    return newFoodPosition;
}

let food = getRandomFoodPosition()

export const update = () => {
    if(onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food =  getRandomFoodPosition()
    }

}

export const draw = (gameBoard) => {
    const foodEl = document.createElement('div');
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    foodEl.classList.add('food');

    gameBoard.appendChild(foodEl)
}