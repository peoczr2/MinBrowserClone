import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AssistantSidebar from './AssistantSidebar'

const el = document.getElementById('assistant-sidebar-root') || document.getElementById('root')
const Component = el?.id === 'assistant-sidebar-root' ? AssistantSidebar : App

if (el) {
  createRoot(el).render(
    <StrictMode>
      <Component />
    </StrictMode>,
  )
}
