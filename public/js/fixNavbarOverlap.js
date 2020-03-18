function handleResizeWindow() {
  const body = document.getElementsByTagName('body')[0]
  const navbar = document.querySelector('.app-navbar')
  body.style.paddingTop = `${parseInt(navbar.offsetHeight) - 1}px`
}

window.addEventListener('resize', handleResizeWindow)

handleResizeWindow()
