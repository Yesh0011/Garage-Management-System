import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../../components/ListingItem';

export default function Home() {

  const [packageListings, setPackageListings] = useState([]);
  const [serviceListings, setServiceListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(serviceListings);


  useEffect(() => {
   
    const fetchServiceListings = async () => {
      try {
        const res = await fetch('/backend/listing/get?type=service&limit=4');
        const data = await res.json();
        setServiceListings(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPackageListings = async () => {
      try {
        const res = await fetch('/backend/listing/get?type=package&limit=4');
        const data = await res.json();
        setPackageListings(data);
        
      } catch (error) {
        log(error);
      }
    };
    fetchServiceListings(); // Fetch service listings first
    fetchPackageListings(); // Fetch package listings separately
  }, []);

  

  return (
    <div>
    <div className="flex justify-center mt-8">
      <div className="relative">
        <Link to="/create-service">
          <button className="bg-slate-700 text-white rounded-lg px-6 py-3 mr-4 hover:bg-opacity-90 focus:outline-none">
            Create Listing
          </button>
        </Link>
        <Link to="/show-service">
          <button className="bg-slate-700 text-white rounded-lg px-6 py-3 mr-4 hover:bg-opacity-90 focus:outline-none">
            Show Listings
          </button>
        </Link>
        <Link to="/show-report">
          <button className="bg-red-700 text-white rounded-lg px-6 py-3 mr-4 hover:bg-opacity-90 focus:outline-none">
            Generate Report
          </button>
        </Link>
      </div>
      </div>

       {/* top */}
       <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          We are EG motors <span className='text-slate-500'>always</span>
          <br />
          <span className='text-yellow-500'>be original</span>
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        
          <br />
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

       {/* swiper */}
       <Swiper navigation>
        {serviceListings &&
          serviceListings.length > 0 &&
          serviceListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

       {/* listing results for offer, sale and rent */}

       <div className='max-w-fit mx-auto p-3 flex flex-col  gap-8 my-10'>
        
        {serviceListings && serviceListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent standalone services </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=service'}>Show more services</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
           
              {serviceListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
        {packageListings && packageListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent service packages</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=package'}>Show more packages</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {packageListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        </div>

      
    
    </div>
  );
}
