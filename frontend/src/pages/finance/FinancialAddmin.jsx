import { Sidebar } from 'flowbite-react';
import { HiDocument, HiOutlineExclamationCircle, HiUser } from 'react-icons/hi';
import { FaQrcode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function FinancialAdmin() {
    return (
    
        <Sidebar className='p-10 flex flex-col gap-4 bg-slate-900 w-30'> 
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to='/spareparts'>
              <Sidebar.Item active icon={HiUser} label={'Admin'} labelColour='dark' as='div' className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer'>
                Spare Parts
              </Sidebar.Item>
            </Link>
            {/* <Link to='/cart'>
            <Sidebar.Item active icon={FaQrcode} label={'Admin'} labelColour='dark' className='bg-green-500 hover:bg-green-600 text-white rounded-md p-2 cursor-pointer'>
              Cart
            </Sidebar.Item>
            </Link> */}
            <Link to='/checkout'>
            <Sidebar.Item active icon={HiDocument} label={'Admin'} labelColour='dark' className='bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2 cursor-pointer'>
              Checkout
            </Sidebar.Item>
            </Link>
            <Link to='/buyer'>
            <Sidebar.Item active icon={HiUser} label={'Admin'} labelColour='dark' className='bg-red-500 hover:bg-red-600 text-white rounded-md p-2 cursor-pointer'>
              Purchase Details
            </Sidebar.Item>
            </Link>
            <Link to='/payment'>
              <Sidebar.Item active icon={HiUser} label={'Admin'} labelColour='dark' as='div' className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer'>
                Payment
              </Sidebar.Item>
            </Link>
            <Link to='/invoice'>
            <Sidebar.Item active icon={FaQrcode} label={'Admin'} labelColour='dark' className='bg-green-500 hover:bg-green-600 text-white rounded-md p-2 cursor-pointer'>
              Payment Details
            </Sidebar.Item>
            </Link>
            <Link to='/addspareparts'>
            <Sidebar.Item active icon={HiDocument} label={'Admin'} labelColour='dark' className='bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2 cursor-pointer'>
              Add Spare Parts
            </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    
  )
}
