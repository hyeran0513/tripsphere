import useRoomType from '../../stores/useRoomType';

const RoomTypeSelector = () => {
  const {
    roomTypes,
    defaultOption,
    addRoomTypes,
    delRoomTypes,
    resetRoomTypes,
  } = useRoomType();

  return (
    <>
      {/* 숙박 장소 선택 */}
      <fieldset className="rounded-lg border border-gray-200 p-3">
        <legend className="fieldset-legend px-2 font-medium">숙박 장소</legend>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {defaultOption.map((ele) => (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox"
                id={ele}
                name={ele}
              />
              <label
                htmlFor={ele}
                key={ele}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {ele}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  );
};

export default RoomTypeSelector;
