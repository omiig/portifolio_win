const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio ('..//assets/audio.mp3')

const size = 20

let snake = [
    {x: 300, y: 300},
]
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number/20) * 20
}

const food = {
    x:randomPosition(), y:randomPosition(), color:"red"
}

const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10
}
let direction, loopId

const drawSnake = () => {
    ctx.fillStyle = "green"
    
    snake.forEach((position,index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "#16dd48"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

const drawFood = () => {
    const {x,y,color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 5
    ctx.fillStyle = color
    ctx.fillRect(food.x, food.y, size, size)
    ctx.shadowBlur = 0
}

const moveSnake = () => {

    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }

    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    }

    if (direction == "down") {
        snake.push ({x: head.x, y: head.y + size})
    }

    if (direction == "up") {
        snake.push ({x: head.x , y: head.y - size})
    }
    
    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 20; i < canvas.width; i+=20) {
        ctx.beginPath()
        ctx.lineTo (i, 0)
        ctx.lineTo (i,600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo (0, i)
        ctx.lineTo (600, i)
        ctx.stroke()
    }

    ctx.stroke()
}

const checkEat = () => {
    const head = snake [snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)

        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
    } 
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neck = snake.length - 2
    const wallCollision =
        head.x < 0 || head.x > 580 || head.y < 0 || head.y > 580

    const selfCollision = snake.find((position,index) => {
            return index < neck && position.x == head.x && position.y == head.y
        })
    if (wallCollision || selfCollision) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    },100)
}

gameLoop()

document.addEventListener("keydown", ({key}) => {
    if ((key == "ArrowRight" || key == "d") && direction != "left") {
        direction = "right"
    }

    if ((key == "ArrowLeft" || key == "a") && direction != "right") {
        direction = "left"
    }

    if ((key == "ArrowUp" || key == "w") && direction != "down") {
        direction = "up"
    }

    if ((key == "ArrowDown" || key == "s") && direction != "up") {
        direction = "down"
    }
})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    snake = [
        {x: 300, y: 300},
    ]
})