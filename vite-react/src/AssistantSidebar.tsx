import { useEffect, useRef, useState } from 'react'
import './AssistantSidebar.css'

export default function AssistantSidebar () {
  const [width, setWidth] = useState(300)
  const widthRef = useRef(width)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const onMouseMove = (e: MouseEvent) => {
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

  const startResize = (e: React.MouseEvent) => {
    startX.current = e.clientX
    startWidth.current = width
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopResize)
    e.preventDefault()
  }

  useEffect(() => {
    widthRef.current = width
    document.body.style.setProperty('--assistant-sidebar-width', `${width}px`)
    window.dispatchEvent(
      new CustomEvent('assistant-sidebar-width-change', { detail: width })
    )
  }, [width])

  return (
    <div style={{ width }}>
      <div className='resize-handle' onMouseDown={startResize}></div>
    </div>
  )
}
