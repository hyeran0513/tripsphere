import React from 'react';
import { BiSolidUser } from 'react-icons/bi';

const HostInfo = ({ product }) => {
  return (
    <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
      <ul className="list">
        <li className="list-row px-0 py-0">
          {/* 호스트 프로필 */}
          <div className="w-[50px] h-[50px] rounded-lg overflow-hidden">
            {product.host.profile_image ? (
              <img
                className="w-[100%] h-[100%] object-cover"
                src={product?.host?.profile_image}
                alt={product?.host?.name}
              />
            ) : (
              <div className="flex justify-center items-center w-[100%] h-[100%] bg-gray-100">
                <BiSolidUser
                  size={24}
                  className="text-gray-300"
                />
              </div>
            )}
          </div>

          {/* 호스트 정보 */}
          <div>
            <div className="font-bold">호스트: {product.host.name}</div>
            <div className="text-xs uppercase opacity-60">
              호스트 연락처 {product.host.contact}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HostInfo;
