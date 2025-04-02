import React from 'react';
import KakaoMap from './KakaoMap';

const ProductLocation = ({ product }) => {
  return (
    <div>
      <div className="flex space-y-6 gap-10 max-w-[1200px] mx-auto">
        <div className="w-full">
          {/* 위치 제목 */}
          <div className="px-4 sm:px-0">
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
