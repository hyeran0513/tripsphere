import { useEffect } from 'react';
import useRoomType from '../../stores/useRoomType';

const RoomTypeSelector = () => {
  const {
    roomTypes,
    defaultOption,
    addRoomTypes,
    delRoomTypes,
    resetRoomTypes,
    getKor,
  } = useRoomType();

  useEffect(() => {}, [roomTypes]);

  const checkType = (type, isChecked) => {
    if (isChecked) addRoomTypes(type);
    else delRoomTypes(type);
  };

  return (
    <>
      {/* 숙박 장소 선택 */}
      {defaultOption.map((ele, index) => (
        <div
          className="flex items-center space-x-2"
          key={ele}>
          <input
            aria-label={
              `${getKor(ele)}`
              // roomTypes.includes(ele)
              //   ? `${getKor(ele)} 선택취소하기`
              //   : `${getKor(ele)} 선택하기`
            }
            type="checkbox"
            className="checkbox"
            checked={roomTypes.includes(ele)}
            // 새로운 스토어 생성 필요. 일단 건너뛰기
            // disabled={!array.some((accom) => accom.type === ele)}
            id={ele}
            name={ele}
            onChange={(e) => checkType(ele, e.target.checked)}
          />
          <label
            htmlFor={ele}
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {getKor(ele)}
          </label>
        </div>
      ))}
    </>
  );
};

export default RoomTypeSelector;
