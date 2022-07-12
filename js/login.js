const login = document.querySelector('.auth__login')
const pass = document.querySelector('.auth__pass')
const authBtn = document.querySelector('.auth__btn')

authBtn.addEventListener('click', () => {
    if (login.value === 'admin' && pass.value === 'admin') {
        const add = document.querySelector('.add')
        add.style.display = 'flex'
        const of = document.querySelector('.of')
        of.style.display = 'flex'
        const auth = document.querySelector('.auth')
        auth.style.display = 'none'
    } else {
        document.querySelector('.auth').innerHTML = `<h1>Неверный логин или пароль</h1>`
    }
})