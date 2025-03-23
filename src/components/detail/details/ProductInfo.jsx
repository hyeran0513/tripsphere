const typeMapping = {
  pension: '펜션',
  hotel: '호텔',
  camping: '캠핑',
};

const ProductInfo = ({ product }) => (
  <div className="px-4 sm:px-0">
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
      {product.name}
    </h3>
    <div className="mt-1 max-w-2xl text-sm/6 text-gray-500">
      <div className="badge badge-soft badge-primary text-xs">
        {typeMapping[product.type]}
      </div>
    </div>
  </div>
);

export default ProductInfo;
