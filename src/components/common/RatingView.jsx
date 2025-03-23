import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingView = ({ ratingScore }) => {
  const rating = Math.floor(ratingScore * 10);
  const star = Math.max(0, Math.floor(rating / 10)); // 정수 별 개수
  const half = rating % 10 >= 5; // 반 개 별 여부
  const empty = Math.max(0, 5 - star - (half ? 1 : 0)); // 남은 빈 별 개수

  return (
    <>
      {/* 정수 개수만큼 별 생성 */}
      {[...Array(star)].map((_, i) => (
        <FaStar key={i} />
      ))}

      {/* 반 개 별 추가 */}
      {half && <FaStarHalfAlt />}

      {/* 빈 별 추가 */}
      {[...Array(empty)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </>
  );
};

export default RatingView;
