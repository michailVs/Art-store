// Импорт значений artArray из админки
// import { artArray } from './admin.js'
console.log(localStorage.getItem('art'))
const artCard = JSON.parse(localStorage.getItem('art'))

// Открыть контакты
const contactBtn = document.querySelector('.contact__btn')
const popContact = document.querySelector('.pop')
const body = document.body

contactBtn.addEventListener('click', () => {
    popContact.classList.add('active')
    body.classList.add('noscroll')
})

// Закрыть контакты
const crossBtn = document.querySelector('.pop__cross')

crossBtn.addEventListener('click', () => {
    popContact.classList.remove('active')
    body.classList.remove('noscroll')
})
// Добавить карточку
const shopCard = document.querySelector('.shop__col')

function createCard(art) {
    return `
        <div class="card">
            <img src="images\\${art.img}" alt="${art.title}" class="card__img">
            <h2 class="card__title">Название: ${art.title}</h2>
            <p class="card__descr">Описание: ${art.descr}</p>
            <p class="card__size">Размер: ${art.width} X ${art.height}</p>
            <p class="card__price">Цена: ${art.price} руб.</p>
        </div>
    `
}
const updateHtml = () => {
    shopCard.innerHTML = ""
    if (artCard.length > 0) {
        artCard.forEach((item) => {
            shopCard.innerHTML += createCard(item)
        })
    }
}
updateHtml()