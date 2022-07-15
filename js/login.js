const login = document.querySelector('.auth__login')
const pass = document.querySelector('.auth__pass')
const authBtn = document.querySelector('.auth__btn')

authBtn.addEventListener('click', () => {
    if (login.value === 'admin' && pass.value === 'admin') {
        // Отображение формы ввода данныех
        const on = document.querySelector('.on')
        on.style.display = 'flex'
        // Отображение карточек в адм панели
        const of = document.querySelector('.of')
        of.style.display = 'flex'
        // Отображение кнопки получения всех карточек
        const all = document.querySelector('.all')
        all.style.display = 'flex'
        // Закрытие поля авторизации
        const auth = document.querySelector('.auth')
        auth.style.display = 'none'
    } else {
        document.querySelector('.auth').innerHTML = `<h1>Неверный логин или пароль</h1>`
    }
})