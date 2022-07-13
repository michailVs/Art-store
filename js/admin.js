const artImg = document.querySelector('.add__img')
const artTitle = document.querySelector('.add__title')
const artDescr = document.querySelector('.add__descr')
const artWidth = document.querySelector('.add__width')
const artHeight = document.querySelector('.add__height')
const artPrice = document.querySelector('.add__price')

const of = document.querySelector('.of')

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
                    <p class="out__price">Цена: ${content[key].price} руб.</p>
                    <button onclick="removeCart(${content[key].id})" class="out__remove">Удалить карточку</button>
                </div>
            `
        }
    }
}
getData()
const updateDb = async () => {
    const sendCard = async () => {
        const cartList = new art(artImg.value, artTitle.value, artDescr.value, parseInt(artWidth.value), parseInt(artHeight.value), parseInt(artPrice.value))
        await sendData('https://62cd28a1a43bf78008529b98.mockapi.io/api/admin/artStore', cartList)
    }
    await sendCard()
    await getData()
}
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
function art(img, title, descr, width, height, price) {
    this.img = img
    this.title = title
    this.descr = descr
    this.width = width
    this.height = height
    this.price = price
}
const removeCart = async id => {
    await fetch(`https://62cd28a1a43bf78008529b98.mockapi.io/api/admin/artStore/${id}`, {method: 'DELETE'})
    await getData()
}