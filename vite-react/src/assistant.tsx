import ReactDOM from 'react-dom/client'
import AssistantSidebar from './AssistantSidebar'

declare global {
  interface Window { assistantWidth?: number; renderAssistantSidebar?: () => void }
}

const rootEl = document.getElementById('assistant-root') as HTMLElement
const root = ReactDOM.createRoot(rootEl)

function render() {
  const width = window.assistantWidth || 300
  root.render(<AssistantSidebar width={width} />)
}

window.renderAssistantSidebar = render
render()
