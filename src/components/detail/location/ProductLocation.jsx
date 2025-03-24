import React from 'react';
import KakaoMap from '../../common/KakaoMap';

const ProductLocation = ({ product }) => {
  return (
    <div>
      <div className="flex space-y-6 gap-10 max-w-[1200px] mx-auto py-[20px] px-[20px]">
        <div className="w-full">
          {/* 위치 제목 */}
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900 dark:text-white">
              위치
            </h3>

            {/* 위치 주소 */}
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              {product.location.place_name}
            </p>
          </div>

          {/* 지도 */}
          <div className="mt-6 border-t border-gray-100">
            <div className="divide-y divide-gray-100">
              <div className="py-4">
                <KakaoMap
                  latitude={product.location.latitude}
                  longitude={product.location.longitude}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLocation;
