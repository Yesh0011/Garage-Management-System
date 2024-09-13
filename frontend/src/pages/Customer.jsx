import React from 'react'
import Customerdashboard from '../components/Customerdashboard'
import Customerprofile from '../components/Customerprofile'

export default function Customer() {
  return (
    <div style={{ display: 'flex',  padding: '0px' }}>
    
    <div style={{ width:'250px', background :'black', padding: '0px'  }}>
        <Customerdashboard/>
    </div>
    <div  style={{position:'relative', right:'-280px', top:'-30px', padding: '5px',  width: '400px'}}>
        <Customerprofile />
    </div>
</div>
  )
}


