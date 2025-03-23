import Rating from '../common/Rating';
import { formatDate } from '../../utils/format';
import { BiMessageAltEdit } from 'react-icons/bi';
import NoData from '../common/NoData';

const ReviewItem = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <NoData
        text="리뷰가 없습니다."
        icon={BiMessageAltEdit}
      />
    );
  }

  return (
    <>
      {reviews?.map((review, index) => (
        <li
          key={index}
          className="list-row">
          {/* 프로필 */}
          <div>
            <img
              className="size-10 rounded-box"
              src={review.userInfo.profile_image}
              alt={review.userInfo.nickname}
            />
          </div>

          {/* 유저 정보 */}
          <div>
            <div>{review.userInfo.nickname}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {formatDate(review.created_at)}
            </div>
          </div>

          {/* 리뷰 내용 */}
          <p className="list-col-wrap text-xs">{review.comment}</p>

          {/* 별점 */}
          <Rating
            rating={review.rating}
            readOnly={true}
          />
        </li>
      ))}
    </>
  );
};

export default ReviewItem;
