import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cartSlice';

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const [serviceDetails, setServiceDetails] = useState([]);

  const handleAddToCart = async (listing) => {
    dispatch(addToCart(listing));
    setShowAlert(true);
    // Automatically hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/backend/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const promises = listing.includedServices.map((serviceId) =>
          fetch(`/backend/listing/get/${serviceId}`).then((res) => res.json())
        );
        const serviceData = await Promise.all(promises);
        setServiceDetails(serviceData);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    if (listing && listing.type === 'package' && listing.includedServices.length > 0) {
      fetchServices();
    }
  }, [listing]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <div className="flex justify-center mt-5">
            <div className="max-w-screen-lg w-full">
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className='h-[400px] rounded-2xl'
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - Rs {listing.price}
            </p>
            <Link to={"/show-cart"}>
              <div className='flex gap-4'>
                <button onClick={() => handleAddToCart(listing)} className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  Add to Cart
                </button>
              </div>
            </Link>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>

            {/* Display included services for package */}
            {listing.type === 'package' && listing.includedServices.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Included Services:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceDetails.map((service) => (
                    <Link to={`/listing/${service._id}`}>
                    <div key={service._id} className="border border-gray-200 p-4 rounded-md hover:scale-105 transition-scale duration-300">
                      <img src={service.imageUrls[0]} alt={service.name} className="w-full h-40 object-cover rounded-md mb-2" />
                      <h3 className="text-lg font-semibold">{service.name}</h3>

                      <p className='text-slate-500 mt-2 font-semibold '>
                      Rs {
                              service.price.toLocaleString('en-US')
                         }
                          {service.type === 'service'}
                      </p>
                    </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alert Message */}
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-3 text-center">
          Listing added to cart successfully!
        </div>
      )}
    </main>
  );
}
