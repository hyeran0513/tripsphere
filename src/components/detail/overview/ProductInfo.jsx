import TypeMapping from '../../common/TypeMapping';
import { BiSolidMap } from 'react-icons/bi';

const ProductInfo = ({ product }) => (
  <div className="mt-4">
    {/* 숙소 유형 */}
    <div className="mt-1 max-w-2xl text-sm/6 text-gray-500">
      <TypeMapping type={product.type} />
    </div>

    {/* 숙소명 */}
    <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
      {product.name}
    </h3>

    {/* 위치 */}
    <p className="flex gap-1 items-center mt-2 text-sm text-gray-500">
      <BiSolidMap /> {product.location.place_name}
    </p>
  </div>
);

export default ProductInfo;
