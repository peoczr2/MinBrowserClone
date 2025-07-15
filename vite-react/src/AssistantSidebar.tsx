import { useEffect, useRef, useState } from 'react'
import './AssistantSidebar.css'

export default function AssistantSidebar () {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(300)
  const isResizing = useRef(false)

  useEffect(() => {
    ;(window as any).toggleAssistantSidebar = () => {
      setOpen(o => !o)
    }
    return () => {
      delete (window as any).toggleAssistantSidebar
    }
  }, [])

  useEffect(() => {
    document.body.style.marginRight = open ? `${width}px` : '0'
  }, [open, width])

  useEffect(() => {
    function onMove (e: MouseEvent) {
      if (!isResizing.current) return
      const newWidth = window.innerWidth - e.clientX
      setWidth(Math.max(150, Math.min(newWidth, 600)))
    }
    function stop () { isResizing.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', stop)
    }
  }, [])

  if (!open) return null

  return (
    <div className='assistant-sidebar' style={{ width }}>
      <div
        className='resize-handle'
        onMouseDown={() => { isResizing.current = true }}
      />
    </div>
  )
}
