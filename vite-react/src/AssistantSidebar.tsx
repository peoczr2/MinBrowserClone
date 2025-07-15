import { useEffect, useRef, useState } from 'react'
import './AssistantSidebar.css'

export default function AssistantSidebar () {
  const [width, setWidth] = useState(300)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const onMouseMove = (e: MouseEvent) => {
    const newWidth = startWidth.current - (e.clientX - startX.current)
    setWidth(Math.max(150, newWidth))
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', stopResize)
  }

  const startResize = (e: React.MouseEvent) => {
    startX.current = e.clientX
    startWidth.current = width
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopResize)
    e.preventDefault()
  }

  useEffect(() => {
    document.body.style.setProperty('--assistant-sidebar-width', `${width}px`)
  }, [width])

  return (
    <div style={{ width }}>
      <div className='resize-handle' onMouseDown={startResize}></div>
    </div>
  )
}
