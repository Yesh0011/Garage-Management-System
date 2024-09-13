import FeedbackSingleCard from './FeedbackSingleCard';

const FeedbackCard = ({feedback}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {feedback.map((item) => (
            <FeedbackSingleCard key={item._id} feedback={item} />
        ))}
    </div>
  )
}

export default FeedbackCard