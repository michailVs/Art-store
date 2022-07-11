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