function initialize () {
  var button = document.getElementById('ai-assistant-button')
  if (!button) return
  button.addEventListener('click', function () {
    document.body.classList.toggle('ai-panel-open')
  })
}

module.exports = { initialize }
