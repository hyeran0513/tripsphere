import PageHeader from '../../components/common/PageHeader';
import { usePointData } from '../../hooks/usePointData';
import { formatDate } from '../../utils/format';
import Loading from '../../components/common/Loading';
import useAuthStore from '../../stores/useAuthStore';

const breadcrumb = [
  { link: '/mypage', text: '마이페이지' },
  { link: '/pointhistory', text: '포인트 내역' },
];

const PointHistory = () => {
  const { user, isAuthenticated } = useAuthStore();

  // 포인트 내역 조회
  const { data, isLoading, error } = usePointData(user?.uid);

  if (isLoading) return <Loading />;
  if (error) return <>{error.message}</>;

  return (
    <div className="max-w-[700px] mx-auto py-[40px]">
      <PageHeader
        title="포인트 내역"
        breadcrumb={breadcrumb}
        hasBackButton={true}
      />

      <ul className="list bg-base-100 rounded-box shadow-md">
        {isAuthenticated &&
          data?.map((point, index) => (
            <li
              className="list-row flex-col flex"
              key={index}>
              <div className="py-2 border-b border-stone-200 flex justify-between items-center">
                <div>{formatDate(point.received_date)}</div>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <h2 className="text-md font-bold">{point.title}</h2>
                    <div className="mb-4 text-xs uppercase opacity-60">
                      {point.description}
                    </div>
                  </div>
                </div>

                <div className="text-secondary">
                  {point.type === 'used' ? '-' : '+'}
                  {point.points} 포인트
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PointHistory;
