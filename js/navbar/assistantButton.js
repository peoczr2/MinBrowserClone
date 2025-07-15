var button = document.getElementById('assistant-button')

function getSidebar () {
  return document.getElementById('assistant-sidebar-root')
}

function toggle () {
  var sidebar = getSidebar()
  var open = document.body.classList.toggle('assistant-open')
  if (sidebar) sidebar.hidden = !open
}

function initialize () {
  if (!button) return
  button.addEventListener('click', toggle)
}

module.exports = { initialize }
