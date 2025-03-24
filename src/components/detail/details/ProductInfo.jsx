import TypeMapping from '../../common/TypeMapping';

const ProductInfo = ({ product }) => (
  <div className="px-4 sm:px-0">
    {/* 숙소명 */}
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
      {product.name}
    </h3>

    {/* 숙소 유형 */}
    <div className="mt-1 max-w-2xl text-sm/6 text-gray-500">
      <TypeMapping type={product.type} />
    </div>
  </div>
);

export default ProductInfo;
