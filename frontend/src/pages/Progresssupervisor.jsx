import Repairdashboard from '../components/Repairdashboard'
import User from '../components/User'

export default function Progresssupervisor() {
  return (
    <div style={{ display: 'flex',  padding: '0px' }}>
    
    <div style={{ width:'250px', background :'black', padding: '0px'  }}>
        <Repairdashboard />
    </div>
    <div style={{position:'relative', right:'-280px', top:'-40px', padding: '5px' }}>
        <User />
    </div>
</div>
  )
}
