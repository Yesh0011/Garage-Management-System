import {Link} from 'react-router-dom';
import {BsChevronLeft} from 'react-icons/bs';

const BackButton = ({ destination = '/'}) => {
  return (
    <div className='flex'>
        <Link 
        to={destination}
        className='bg-sky-800 text-white flex justify-center items-center rounded-lg w-10 h-10'
        >
        <BsChevronLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default BackButton