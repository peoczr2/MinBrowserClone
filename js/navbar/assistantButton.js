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
    window.addEventListener('assistant-sidebar-collapse', handleCollapse)
  } else {
    applyWidth(0)
    window.removeEventListener('assistant-sidebar-width-change', handleResize)
    window.removeEventListener('assistant-sidebar-collapse', handleCollapse)
  }
}

function handleCollapse () {
  var sidebar = getSidebar()
  if (!document.body.classList.contains('assistant-open')) return
  document.body.classList.remove('assistant-open')
  if (sidebar) sidebar.hidden = true
  applyWidth(0)
  window.removeEventListener('assistant-sidebar-width-change', handleResize)
  window.removeEventListener('assistant-sidebar-collapse', handleCollapse)
}

function initialize () {
  if (!button) return
  button.addEventListener('click', toggle)
  window.addEventListener('assistant-sidebar-collapse', handleCollapse)
}

module.exports = { initialize }
