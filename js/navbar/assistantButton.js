var webviews = require('webviews.js')

var assistantButton = document.getElementById('assistant-button')
var panel = document.getElementById('assistant-panel')
var panelWidth = 300

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

function initialize () {
  assistantButton.addEventListener('click', toggle)
}

module.exports = { initialize, show, hide }
