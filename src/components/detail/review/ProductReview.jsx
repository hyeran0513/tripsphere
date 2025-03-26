import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';

const ProductReview = ({ reviews, handleReFetch, productId }) => {
  return (
    <div className="flex space-y-6 gap-10 max-w-[1200px] mx-auto">
      <div className="w-full">
        <div className="mt-6 border-t border-gray-100">
          <div className="divide-y divide-gray-100">
            <div className="py-4">
              <ReviewForm
                handleNewReview={handleReFetch}
                productId={productId}
              />

              <ul className="list">
                <ReviewItem reviews={reviews} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
