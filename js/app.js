// Импорт значений artArray из бд
const url = 'https://62cd28a1a43bf78008529b98.mockapi.io/api/admin/artStore'
const getData = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Ошибка по адресу: ${url}; Статус ошибки: ${response.status}`)
    }
    return await response.json()
}
    
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

// Получение данных из бд и вывод карточки
const shopCard = document.querySelector('.shop__col')
const formatter = new Intl.NumberFormat('ru')
const artCard = async () => {
    let artC = await getData(url)
    for (const key in artC) {
        shopCard.innerHTML += `
        <div class="card">
            <img src="${artC[key].img}" alt="${artC[key].title}" class="card__img" data-img="img">
            <h2 class="card__title">Название: ${artC[key].title}</h2>
            <p class="card__descr">Описание: ${artC[key].descr}</p>
            <p class="card__size">Размер, мм: ${artC[key].width} X ${artC[key].height}</p>
            <p class="card__price">Цена: ${formatter.format(artC[key].price)} руб.</p>
        </div>
    `
    }
}
artCard()

// Увелечение картинки при клике
window.addEventListener('click', e => {
    const shop = document.querySelector('.shop')
    if (e.target.dataset.img === 'img') {
        const card = e.target.closest('.card')
        const imgCard = card.querySelector('.card__img').getAttribute('src')
        if (imgCard.length > 0) {
            shop.style.display = 'none'
            document.querySelector('.msize__out').innerHTML = `
            <div class="msize__cont">
                <img src="${imgCard}" alt="" class="msize__cont-img">
                <img src="images/close.png" alt="Close cross" class="msize__cont-cross">
            </div>
        `
        }
    }
    document.querySelector('.msize__cont-cross').addEventListener('click', () => {
        document.querySelector('.msize__out').innerHTML = ''
        shop.removeAttribute('style')
    })
})