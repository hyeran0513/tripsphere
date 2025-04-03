import { BiChevronRight, BiCalendarAlt } from 'react-icons/bi';
import Modal from '../Molecules/Modal';
import ServiceList from '../Organisms/ServiceList';
import { formatDate, formatTimeStampTime } from '../../utils/format';

const RoomInfo = ({ room, index }) => (
  <>
    <div className="flex justify-between items-center">
      {/* 숙소 유형 */}
      <h4 className="font-semibold text-gray-700 dark:text-white">
        {room.stay_type === 'stay' ? '숙박' : '대실'}
      </h4>

      {/* 상세보기 */}
      <button
        className="flex items-center text-xs font-semibold cursor-pointer"
        onClick={() =>
          document
            .getElementById(`room${index}_${room.room_group_id}`)
            .showModal()
        }>
        상세보기 <BiChevronRight className="text-lg" />
      </button>
    </div>

    {/* 체크인 체크아웃 */}
    <p className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
      <BiCalendarAlt /> {formatDate(room.check_in)}{' '}
      {room.stay_type === 'stay' && `- ${formatDate(room.check_out)}`}
    </p>

    <p className="mt-1 text-xs text-gray-500 dark:text-white">
      체크인: {formatTimeStampTime(room.check_in)} ~ 체크아웃:{' '}
      {formatTimeStampTime(room.check_out)}
    </p>

    {/* 모달 */}
    <Modal
      buttonTitle={room.name}
      modalId={`room${index}_${room.room_group_id}`}
      title={`${room.name} (${room.stay_type === 'stay' ? '숙박' : '대실'})`}
      hideButton>
      <div className="py-4">{room.description}</div>
      <ServiceList services={room.services} />
    </Modal>
  </>
);

export default RoomInfo;
