import { BiWifi } from 'react-icons/bi';
import { IoCarSportOutline } from 'react-icons/io5';
import { BiTv } from 'react-icons/bi';
import { MdOutlineBreakfastDining } from 'react-icons/md';
import { GiBarbecue } from 'react-icons/gi';

const ServiceIcon = ({ type }) => {
  const services = {
    wifi: { icon: <BiWifi />, name: '와이파이' },
    parking: { icon: <IoCarSportOutline />, name: '주차장' },
    tv: { icon: <BiTv />, name: 'TV' },
    breakfast: { icon: <MdOutlineBreakfastDining />, name: '조식' },
    barbecue: { icon: <GiBarbecue />, name: '바비큐' },
  };

  return (
    <div className="flex items-center gap-3">
      <div className="text-lg">{services[type].icon}</div>
      <span>{services[type].name}</span>
    </div>
  );
};

export default ServiceIcon;
