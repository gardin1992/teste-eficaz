var menu = document.querySelector('#menu')
var menuContent = document.querySelector('#menu-content')

function hideMenu() {
    menuContent.style.display = 'none'
}

function showMenu() {
    menuContent.style.display = 'block'
}

menu.addEventListener('mouseenter', function (e) {
    showMenu()
})

menuContent.addEventListener('mouseenter', function (e) {
    showMenu()
})

menu.addEventListener('mouseleave', function (e) {
    hideMenu()
})
menuContent.addEventListener('mouseleave', function (e) {
    hideMenu()
})
