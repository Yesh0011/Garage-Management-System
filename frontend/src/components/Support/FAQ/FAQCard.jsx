import FAQSingleCard from './FAQSingleCard';

const faqCard = ({faq}) => {
  return (
    <div className='grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'>
        {faq.map((item) => (
            <FAQSingleCard key={item._id} faq={item} />
        ))}
    </div>
  )
}

export default faqCard