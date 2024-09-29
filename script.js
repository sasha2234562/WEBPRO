const btn = document.getElementById('start');
const inputTime = document.getElementById('game-time');
const timeDisplay = document.getElementById('time');
const time_header = document.getElementById('time-header');
const result = document.getElementById('result');
const result_header = document.getElementById('result-header');
const game = document.getElementById('game');

let countdown;
let clickCount = 0;

function clickStartOfTiming() {
    btn.style.display = 'none';
    result_header.classList.add('hide');
    time_header.style.display = 'block';
    result.textContent = clickCount.toString();
    clickCount = 0;
    clearInterval(countdown);
    let timeLeft = parseFloat(inputTime.value);

    timeDisplay.textContent = timeLeft.toFixed(1);

    countdown = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timeDisplay.textContent = "0.0";
        } else {
            timeDisplay.textContent = timeLeft.toFixed(1);
        }
    }, 100);
}

function getRandomColor() {
    //create random square color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createSquare() {
    const gameTime = parseInt(inputTime.value);
    let squaresAdded = 0;
    const interval = setInterval(() => {
        if (squaresAdded < gameTime) {
            const square = document.createElement('div');
            square.id = 'square';
            square.style.backgroundColor = getRandomColor();
            square.style.position = 'absolute';
            square.style.cursor = 'pointer';

            const size = getRandomSize(50, 100);
            square.style.width = `${size}px`;
            square.style.height = `${size}px`;

            const x = Math.random() * (game.clientWidth - size);
            const y = Math.random() * (game.clientHeight - size);
            square.style.left = `${x}px`;
            square.style.top = `${y}px`;

            game.appendChild(square);
            squaresAdded++;
            square.addEventListener('click', (e) => {
                clickCount++;
                result.textContent = clickCount.toString();
                let circle = document.createElement('span');
                square.appendChild(circle);
                circle.style.left = e.offsetX + 'px';
                circle.style.top = e.offsetY + 'px';
                circle.style.borderColor = 'grey';
                circle.classList.add('click');

                setTimeout(() => {
                    circle.remove();
                }, 1000);

                setTimeout(() => {
                    game.removeChild(square);
                }, 1000);
            });
            setTimeout(() => {
                square.style.opacity = '0';
                setTimeout(() => {
                    game.removeChild(square);
                }, 1000);
            }, 1000);
        } else {
            btn.style.display = 'block';
            time_header.style.display = 'none';
            result_header.classList.remove('hide');
            clearInterval(interval);
        }
    }, 1000);
}

function getRandomSize(min, max) {
    //create random square sizes
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

btn.addEventListener('click', () => {
    clickStartOfTiming();
    createSquare()
})
inputTime.addEventListener('input', () => {
    let value = parseFloat(inputTime.value);
    if (Number.isInteger(value)) {
        //If it's an integer, print it with .0
        timeDisplay.textContent = value.toFixed(1);
    } else {
        //Otherwise we just print the value
        timeDisplay.textContent = value;
    }
});

game.onclick = (e) => {
    if (e.target.id === 'square') {
        return;
    }
    //creating a ripple effect
    let circle = document.createElement('span');
    circle.style.left = e.offsetX + 'px';
    circle.style.top = e.offsetY + 'px';
    circle.style.borderColor = 'grey';
    game.appendChild(circle);
    circle.classList.add('click');

    setTimeout(() => circle.remove(), 500);
};