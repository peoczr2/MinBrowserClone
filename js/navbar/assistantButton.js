var webviews = require('webviews.js')

var assistantButton = document.getElementById('assistant-button')
var panel = document.getElementById('assistant-panel')
var resizer = document.getElementById('assistant-panel-resizer')
var panelWidth = 300
var isResizing = false
var startX = 0
var startWidth = 0

function show () {
  if (panel.dataset.visible === 'true') return
  panel.dataset.visible = 'true'
  document.body.classList.add('assistant-panel-visible')
  webviews.adjustMargin([0, panelWidth, 0, 0])
}

function hide () {
  if (panel.dataset.visible !== 'true') return
  panel.dataset.visible = 'false'
  document.body.classList.remove('assistant-panel-visible')
  webviews.adjustMargin([0, -panelWidth, 0, 0])
}

function toggle () {
  if (panel.dataset.visible === 'true') {
    hide()
  } else {
    show()
  }
}

function onMouseMove (e) {
  if (!isResizing) return
  var newWidth = Math.max(150, startWidth + (startX - e.clientX))
  if (newWidth !== panelWidth) {
    panel.style.width = newWidth + 'px'
    webviews.adjustMargin([0, newWidth - panelWidth, 0, 0])
    panelWidth = newWidth
  }
}

function onMouseUp () {
  if (!isResizing) return
  isResizing = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

function initialize () {
  assistantButton.addEventListener('click', toggle)
  if (resizer) {
    resizer.addEventListener('mousedown', function (e) {
      isResizing = true
      startX = e.clientX
      startWidth = panelWidth
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      e.preventDefault()
    })
  }
}

module.exports = { initialize, show, hide }
