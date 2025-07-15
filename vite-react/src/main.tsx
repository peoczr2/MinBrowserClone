import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AssistantPanel from './AssistantPanel'

const container = document.getElementById('assistant-panel-react-root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <AssistantPanel />
    </StrictMode>,
  )
}
