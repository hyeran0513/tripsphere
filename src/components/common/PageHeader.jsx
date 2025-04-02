import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import Heading from './Heading';

const PageHeader = ({ title, breadcrumb, hasBackButton, navigateLink }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-[30px] pb-7 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* 페이지 경로 */}
        <Breadcrumb breadcrumb={breadcrumb} />

        {/* 뒤로 가기 버튼 */}
        {hasBackButton && (
          <button
            type="button"
            onClick={() => navigate(navigateLink)}>
            <BiArrowBack className="size-6 hover:cursor-pointer" />
          </button>
        )}
      </div>

      {/* 제목 */}
      <Heading title={title} />
    </div>
  );
};

export default PageHeader;
