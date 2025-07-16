import { Sidebar } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'

interface Props { width: number }

export default function AssistantSidebar({ width }: Props) {
  return (
    <Sidebar width={`${width}px`} backgroundColor="red" rootStyles={{height:'100%'}}>
    </Sidebar>
  )
}
