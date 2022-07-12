const artImg = document.querySelector('.add__img')
const artTitle = document.querySelector('.add__title')
const artDescr = document.querySelector('.add__descr')
const artWidth = document.querySelector('.add__width')
const artHeight = document.querySelector('.add__height')
const artPrice = document.querySelector('.add__price')


const of = document.querySelector('.of')
let artArray = []
!localStorage.getItem('art') ? artArray = [] : artArray = JSON.parse(localStorage.getItem('art'))
const addBtn = document.querySelector('.add__art')
if (addBtn) {
    
}
addBtn.addEventListener('click', () => {
    artArray.push(new art(artImg.value.match(/\w+\.[png, jpg]+/), artTitle.value, artDescr.value, parseInt(artWidth.value), parseInt(artHeight.value), parseInt(artPrice.value)))
    updateLs()
    updateHtml()
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
const updateHtml = () => {
    of.innerHTML = ""
    if (artArray.length > 0) {
        artArray.forEach((item, index) => {
            of.innerHTML += createArt(item, index)
        })
    }
}
updateHtml()

const updateLs = () => {
    localStorage.setItem('art', JSON.stringify(artArray))
}
function createArt(art, index) {
    return `
        <div class="out">
            <img src="images\\${art.img}" alt="${art.title}">
            <h2 class="out__title">Название: ${art.title}</h2>
            <p class="out__descr">Описание: ${art.descr}</p>
            <p class="out__size">Размер: ${art.width} X ${art.height}</p>
            <p class="out__price">Цена: ${art.price} руб.</p>
            <button onclick="removeArt(${index}) "class="out__remove">Удалить карточку</button>
        </div>
    `
}

const removeArt = index => {
    artArray.splice(index, 1)
    updateLs()
    updateHtml()
}
// export { artArray }