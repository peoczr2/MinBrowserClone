import { createRoot } from 'react-dom/client'
import AiPanel from './AiPanel'

const root = document.getElementById('ai-extension-root')!
createRoot(root).render(<AiPanel />)

const btn = document.getElementById('ai-assistant-button')
btn?.addEventListener('click', () => {
  document.getElementById('ai-panel')?.classList.toggle('open')
})
