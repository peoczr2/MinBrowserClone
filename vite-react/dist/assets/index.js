import React, { StrictMode, useEffect, useRef, useState } from 'https://esm.sh/react@19.1.0'
import { createRoot } from 'https://esm.sh/react-dom@19.1.0/client'

function AssistantSidebar () {
  const [width, setWidth] = useState(300)
  const widthRef = useRef(width)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const onMouseMove = (e) => {
    const newWidth = startWidth.current - (e.clientX - startX.current)
    setWidth(Math.max(0, newWidth))
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', stopResize)
    if (widthRef.current <= 50) {
      window.dispatchEvent(new CustomEvent('assistant-sidebar-collapse'))
      setWidth(300)
    }
  }

  const startResize = (e) => {
    startX.current = e.clientX
    startWidth.current = width
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopResize)
    e.preventDefault()
  }

  useEffect(() => {
    widthRef.current = width
    document.body.style.setProperty('--assistant-sidebar-width', `${width}px`)
    window.dispatchEvent(new CustomEvent('assistant-sidebar-width-change', { detail: width }))
  }, [width])

  return React.createElement(
    'div',
    { style: { width: `${width}px` } },
    React.createElement('div', { className: 'resize-handle', onMouseDown: startResize })
  )
}

const el = document.getElementById('assistant-sidebar-root')
if (el) {
  createRoot(el).render(
    React.createElement(StrictMode, null, React.createElement(AssistantSidebar))
  )
}
