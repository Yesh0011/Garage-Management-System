import FAQSingleCard from './FAQSingleCard';
import FAQSingleCardCus from './FAQSingleCardCustomer';

const faqcardCus = ({faq}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {faq.map((item) => (
            <FAQSingleCardCus key={item._id} faq={item} />
        ))}
    </div>
  )
}

export default faqcardCus