var webviews = require('webviews.js')

var assistantButton = document.getElementById('assistant-button')
var panel = document.getElementById('assistant-panel')
var panelWidth = 300
var MIN_WIDTH = 200
var resizer = document.getElementById('assistant-panel-resizer')
var isResizing = false
var startX
var startWidth

function show () {
  if (panel.dataset.visible === 'true') return
  panel.dataset.visible = 'true'
  document.body.classList.add('assistant-panel-visible')
  panel.style.setProperty('--assistant-panel-width', panelWidth + 'px')
  webviews.adjustMargin([0, panelWidth, 0, 0])
}

function hide () {
  if (panel.dataset.visible !== 'true') return
  panel.dataset.visible = 'false'
  document.body.classList.remove('assistant-panel-visible')
  panel.style.removeProperty('--assistant-panel-width')
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

  if (resizer) {
    resizer.addEventListener('mousedown', function (e) {
      isResizing = true
      startX = e.clientX
      startWidth = panelWidth
      e.preventDefault()
    })

    window.addEventListener('mousemove', function (e) {
      if (!isResizing) return
      var newWidth = startWidth + (startX - e.clientX)
      if (newWidth < MIN_WIDTH) {
        hide()
        isResizing = false
        panelWidth = MIN_WIDTH
        return
      }
      var diff = newWidth - panelWidth
      if (diff !== 0) {
        panelWidth = newWidth
        panel.style.setProperty('--assistant-panel-width', newWidth + 'px')
        if (panel.dataset.visible === 'true') {
          webviews.adjustMargin([0, diff, 0, 0])
        }
      }
    })

    window.addEventListener('mouseup', function () {
      if (isResizing) {
        isResizing = false
      }
    })
  }
}

module.exports = { initialize, show, hide }
