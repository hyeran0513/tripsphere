import React, { useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import SideFilter from '../../components/accomlist/SideFilter';
import { BiBuildings } from 'react-icons/bi';
import { useAccomData } from '../../hooks/useAccomData';
import Loading from '../../components/common/Loading';
import AccomCard from '../../components/accomlist/AccomCard';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/products', text: '여행 검색 결과 목록' },
];

const typeMapping = [
  { value: 'hotel', text: '호텔', icon: <BiBuildings className="text-2xl" /> },
  { value: 'motel', text: '모텔', icon: <BiBuildings className="text-2xl" /> },
  {
    value: 'resort',
    text: '리조트',
    icon: <BiBuildings className="text-2xl" />,
  },
  {
    value: 'pension',
    text: '펜션',
    icon: <BiBuildings className="text-2xl" />,
  },
  {
    value: 'guesthouse',
    text: '게스트하우스',
    icon: <BiBuildings className="text-2xl" />,
  },
  {
    value: 'camping',
    text: '캠핑',
    icon: <BiBuildings className="text-2xl" />,
  },
];

const AccomList = () => {
  const { data, isLoading } = useAccomData();

  useEffect(() => {
    console.log('@@@' + JSON.stringify(data));
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      <PageHeader
        title="여행 숙소 검색 결과"
        breadcrumb={breadcrumb}
      />

      <div className="flex gap-4 mb-10">
        {typeMapping.map((item) => (
          <div
            key={item.value}
            className="flex flex-col flex-1 items-center gap-1 cursor-pointer">
            {item.icon}
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>

      <div
        id="container"
        className="flex items-start gap-10">
        <SideFilter />

        <ul className="flex-1 flex flex-col gap-6">
          {data.map((item, index) => (
            <AccomCard
              accommodation={item}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccomList;
