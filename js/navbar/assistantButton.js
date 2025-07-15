function initialize () {
  const button = document.getElementById('assistant-button')
  if (!button) return
  button.addEventListener('click', () => {
    if (window.toggleAssistantSidebar) {
      window.toggleAssistantSidebar()
    }
  })
}

module.exports = { initialize }
