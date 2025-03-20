import React, { useEffect, useState } from 'react';
import { LiaCoinsSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { usePointData } from '../../hooks/usePointData';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { formatDate } from '../../utils/format';

const PointHistory = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase 인증 상태가 변경될 때마다 호출
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 컴포넌트가 언마운트될 때 리스너를 정리
    return () => unsubscribe();
  }, []);

  const { data, isLoading, error } = usePointData(user?.uid);

  useEffect(() => {
    if (data) {
      console.log('포인트 목록 내역:', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <>로딩 중..</>;
  if (error) return <>오류</>;

  return (
    <>
      <div className="mt-8 p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between ">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <LiaCoinsSolid size={20} /> 포인트 내역
        </h2>

        <Link
          to="/pointhistory"
          className="text-primary font-bold">
          더 보기
        </Link>
      </div>

      <ul className="  list bg-base-100 rounded-box shadow-md mb-10">
        {data &&
          data.map((point, index) => (
            <li
              key={index}
              className="list-row flex-col flex">
              <div className="py-2 border-b border-stone-200 flex justify-between items-center">
                <div>{formatDate(point.received_date)}</div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <h2 className="text-md font-bold">{point.title}</h2>
                    <div className="my-4 text-xs uppercase opacity-60">
                      {point.description}
                    </div>
                  </div>
                </div>
                <div className="text-secondary">{point.points} 포인트</div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PointHistory;
