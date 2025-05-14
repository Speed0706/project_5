// GMAIL CHECKER
const emailInput = document.querySelector('#gmail_input')
const emailButton = document.querySelector('#gmail_button')
const emailResult = document.querySelector('#gmail_result')



const regExp = /^[a-z0-9.]+@gmail\.com$/

emailButton.onclick = () => {
    if (regExp.test(emailInput.value)) {
        emailResult.innerText = 'OK'
        emailResult.style.color = 'green'
    } else {
        emailResult.innerText = 'ERROR'
        emailResult.style.color = 'red'
    }
}

// MOVE BLOCK

const parentBlock = document.querySelector( '.parent_block'),
childBlock = document.querySelector( '.child_block')

let positionX = 0, positionY = 0

const offsetWidth = parentBlock.clientWidth - childBlock.clientWidth
const offsetHeight = parentBlock.clientHeight - childBlock.clientHeight

const moveBlock = () => {
    requestAnimationFrame(moveBlock)
    childBlock.style.left = `${positionX}px`
    childBlock.style.top = `${positionY}px`

    if (positionX < offsetWidth && positionY === 0) positionX++ // Движение вправо
    else if (positionX >= offsetWidth && positionY < offsetHeight) positionY++ // Движение вниз
    else if (positionX > 0 && positionY >= offsetHeight) positionX-- // Движение влево
    else if (positionX <= 0 && positionY > 0) positionY-- // Движение вверх
}

moveBlock()

//STOP WATCH
const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

let seconds = 0;
let intervalId = null;


const updateDisplay = () => {
    secondsDisplay.textContent = seconds;
};


const startTimer = () => {

    if (intervalId !== null) return;


    intervalId = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
};


const stopTimer = () => {

    clearInterval(intervalId);
    intervalId = null;
};


const resetTimer = () => {

    clearInterval(intervalId);
    intervalId = null;

    seconds = 0;
    updateDisplay();
};


startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);


updateDisplay();

// CHARACTRERS


const characters = [
    {
        name: "Dean Winchester",
        age: 30,
        photo: "https://puzzleit.ru/files/puzzles/42/41568/_background.jpg"
    },
    {
        name: "02",
        age: 16,
        photo: "https://sun1-95.userapi.com/impg/c856020/v856020607/204652/Xwf0R1nVy_0.jpg?size=510x510&quality=96&sign=3683fbf5dad9a661780cdd7d23675d4a&type=album"
    },
    {
        name: "Subaru Natsuki",
        age: 16,
        photo: "https://i.pinimg.com/736x/2f/cb/f0/2fcbf0696f7d06227f72fbbb697b40ae.jpg"
    }
];


const charactersList = document.querySelector('.characters-list');


if (!charactersList) {
    console.error('Элемент .characters-list не найден!');
} else {

    characters.forEach(character => {

        console.log('Обрабатываем персонажа:', character.name);

        const card = document.createElement('div');
        card.classList.add('character-card');


        card.innerHTML = `
            <img src="${character.photo}" alt="${character.name || 'Без имени'}">
            <h3>${character.name || 'Имя отсутствует'}</h3>
            <p>Возраст: ${character.age}</p>
        `;

        charactersList.appendChild(card);
    });
}

// beka json

const xhr = new XMLHttpRequest();
xhr.open('GET', '../beka/beka.json', true);
xhr.responseType = 'json';
xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(xhr.response);
    } else {
        console.error('Ошибка:', xhr.status, xhr.statusText);
    }
};
xhr.onerror = () => console.error('Сетевая ошибка или файл не найден');
xhr.send();

