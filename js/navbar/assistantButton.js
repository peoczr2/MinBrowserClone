var button = document.getElementById('assistant-button')
var webviews = require('webviews.js')

var currentWidth = 0

function getSidebar () {
  return document.getElementById('assistant-sidebar-root')
}

function getWidth (sidebar) {
  return sidebar ? sidebar.getBoundingClientRect().width : 0
}

function applyWidth (width) {
  var delta = width - currentWidth
  webviews.adjustMargin([0, delta, 0, 0])
  currentWidth = width
}

function handleResize (e) {
  if (document.body.classList.contains('assistant-open')) {
    applyWidth(e.detail)
  }
}

function toggle () {
  var sidebar = getSidebar()
  var open = document.body.classList.toggle('assistant-open')
  if (sidebar) sidebar.hidden = !open
  if (open) {
    applyWidth(getWidth(sidebar))
    window.addEventListener('assistant-sidebar-width-change', handleResize)
  } else {
    applyWidth(0)
    window.removeEventListener('assistant-sidebar-width-change', handleResize)
  }
}

function initialize () {
  if (!button) return
  button.addEventListener('click', toggle)
}

module.exports = { initialize }
