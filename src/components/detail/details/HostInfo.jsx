import React from 'react';

const HostInfo = ({ product }) => {
  return (
    <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
      <ul className="list">
        <li className="list-row px-0 py-0">
          {/* 호스트 프로필 */}
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>

          {/* 호스트 정보 */}
          <div>
            <div className="font-bold">호스트: {product.host.name}</div>
            <div className="text-xs uppercase opacity-60">
              호스트 경력 {product.host.experience}년
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HostInfo;
