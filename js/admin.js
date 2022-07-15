// Получение данных из инпутов
const artImg = document.querySelector('.add__img')
const artTitle = document.querySelector('.add__title')
const artDescr = document.querySelector('.add__descr')
const artWidth = document.querySelector('.add__width')
const artHeight = document.querySelector('.add__height')
const artPrice = document.querySelector('.add__price')

// Объект для вывода созданных карточек
const of = document.querySelector('.of')

//Оправка данных в бд
const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Ошибка по адресу: ${url}; Статус ошибки: ${response.status}`)
    }
    return await response.json()
}
// Получение данных и создание карточек
const formatter = new Intl.NumberFormat('ru')
const getData = async () => {
    let cartArray = await fetch('https://62cd28a1a43bf78008529b98.mockapi.io/api/admin/artStore')
    let content = await cartArray.json()
    
    of.innerHTML = ""
    if (content.length > 0) {
        for (const key in content) {
            of.innerHTML += `
                <div class="out">
                    <img src="${content[key].img}" alt="${content[key].title}">
                    <h2 class="out__title">Название: ${content[key].title}</h2>
                    <p class="out__descr">Описание: ${content[key].descr}</p>
                    <p class="out__size">Размер: ${content[key].width} X ${content[key].height}</p>
                    <p class="out__price">Цена: ${formatter.format(content[key].price)} руб.</p>
                    <button onclick="removeCart(${content[key].id})" class="out__remove">Удалить карточку</button>
                </div>
            `
        }
    }
}
getData()

// Обновление бд
const updateDb = async () => {
    const sendCard = async () => {
        const cartList = new art(artImg.value, artTitle.value, artDescr.value, +artWidth.value, +artHeight.value, +artPrice.value)
        await sendData('https://62cd28a1a43bf78008529b98.mockapi.io/api/admin/artStore', cartList)
    }
    await sendCard()
    getData()
}
// Вешаем событие клик на кнопку "Сохранить и вывести"
const addBtn = document.querySelector('.add__art')
addBtn.addEventListener('click', () => {
    updateDb()
    document.querySelector('.add__width').value = ''
    document.querySelector('.add__img').value = ''
    document.querySelector('.add__height').value = ''
    document.querySelector('.add__price').value = ''
    document.querySelector('.add__title').value = ''
    document.querySelector('.add__descr').value = ''
})
// Создание и заполнение объекта
function art(img, title, descr, width, height, price) {
    this.img = img
    this.title = title
    this.descr = descr
    this.width = width
    this.height = height
    this.price = price
}
// Функция удаление карточик из просмотра и бд
const removeCart = async id => {
    await fetch(`https://62cd28a1a43bf78008529b98.mockapi.io/api/admin/artStore/${id}`, {method: 'DELETE'})
    getData()
}