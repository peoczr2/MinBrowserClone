var assistantButton = document.getElementById('assistant-button')
var panel = document.getElementById('assistant-panel')
var resizer = document.getElementById('assistant-resizer')
var webviews = document.getElementById('webviews')

var width = Number(localStorage.getItem('assistant-panel-width')) || 300
var minWidth = 150
var resizing = false

function setWidth (w) {
  width = w
  localStorage.setItem('assistant-panel-width', w)
  panel.style.width = w + 'px'
  webviews.style.marginRight = w + 'px'
  window.assistantWidth = w
  if (window.renderAssistantSidebar) {
    window.renderAssistantSidebar()
  }
}

function showPanel () {
  panel.classList.add('visible')
  setWidth(width)
}

function hidePanel () {
  panel.classList.remove('visible')
  webviews.style.marginRight = ''
}

function togglePanel () {
  if (panel.classList.contains('visible')) {
    hidePanel()
  } else {
    showPanel()
  }
}

function onMouseMove (e) {
  if (!resizing) return
  var newWidth = window.innerWidth - e.clientX
  if (newWidth < minWidth) {
    hidePanel()
    return
  }
  setWidth(newWidth)
}

function onMouseUp () { resizing = false }

function initialize () {
  assistantButton.addEventListener('click', togglePanel)
  resizer.addEventListener('mousedown', function (e) {
    if (!panel.classList.contains('visible')) return
    resizing = true
    e.preventDefault()
  })
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

module.exports = { initialize }
