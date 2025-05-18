const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [257]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerText = 'OK';
        phoneResult.style.color = 'green';
    } else {
        phoneResult.innerText = 'NOT OK';
        phoneResult.style.color = 'red';
    }
}

// TAB SLIDER

const tabContentBlock = document.querySelectorAll('.tab_content_block');
const tabContentItem = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hidTAbContent = () => {
    tabContentBlock.forEach((item) => {
        item.style.display = 'none';
    });
    tabContentItem.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tabContentBlock[index].style.display = 'block';
    tabContentItem[index].classList.add('tab_content_item_active');
};

hidTAbContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItem.forEach((item, index) => {
            if (event.target === item) {
                hidTAbContent();
                showTabContent(index);
                currentIndex = index;
            }
        });
    }
};


let currentIndex = 0;
setInterval(() => {
    hidTAbContent();
    if (currentIndex === 0) {
        currentIndex = 1;
    } else {
        currentIndex = (currentIndex + 1) % tabContentBlock.length;
    }
    showTabContent(currentIndex);
}, 3000);




// CONVERTER

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')

const converter = (element, target1, target2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response);


            if (target1.id === 'usd') {
                target1.value = (element.value / data.usd).toFixed(2)
            } else if (target1.id === 'som') {
                target1.value = (element.value * data.usd).toFixed(2)
            } else if (target1.id === 'eur') {
                target1.value = (element.value / data.eur).toFixed(2)
            }


            if (target2.id === 'usd') {
                target2.value = (element.value / data.usd).toFixed(2)
            } else if (target2.id === 'som') {
                target2.value = (element.value * data.usd).toFixed(2)
            } else if (target2.id === 'eur') {
                target2.value = (element.value / data.eur).toFixed(2)
            }

            if (element.value === '') {
                target1.value = ''
                target2.value = ''
            }
        }
    }
}

converter(somInput, usdInput, eurInput)
converter(usdInput, somInput, eurInput)
converter(eurInput, somInput, usdInput)



//CARD SWITCHER


const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let cardId = 1; // Начнем с первой карточки

const fetchAndUpdateCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => {
            const { id, title, completed } = data
            cardBlock.innerHTML = `
                <p>${title}</p>
                <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
                <span>${id}</span>
            `;
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error)
            cardBlock.innerHTML = `<p>Ошибка загрузки данных</p>`
        });
};

const updateCardId = (direction) => {
    if (direction === 'next') {
        cardId = cardId >= 200 ? 1 : cardId + 1
    } else if (direction === 'prev') {
        cardId = cardId <= 1 ? 200 : cardId - 1
    }
    fetchAndUpdateCard(cardId)
};

fetchAndUpdateCard(cardId)

btnNext.onclick = () => updateCardId('next')
btnPrev.onclick = () => updateCardId('prev')


//fetch запрос


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        console.log('Данные:', posts);
    })
    .catch(error => {
        console.error('ERROR:', error);
    });