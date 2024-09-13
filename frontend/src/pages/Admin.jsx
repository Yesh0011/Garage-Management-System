import User from "../components/User";

import Admindashboard from "../components/Admindashboard";

export default function Admin() {
  return (
    <div className='flex justify-between'>

    <div>
      <Admindashboard/>
    </div>

    <User />
  </div>
  )
}
