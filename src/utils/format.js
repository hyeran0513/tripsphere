import { differenceInDays, parse } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

// 숫자 3자리마다 콤마를 추가
export const formatNumber = (input) => {
  const number = Number(input);

  if (isNaN(number)) {
    return '';
  }

  return number.toLocaleString();
};

// timestamp 날짜 포맷
export const formatDate = (timestamp) => {
  if (!timestamp || !timestamp.seconds) {
    return '';
  }

  // seconds를 밀리초로 변환
  const date = new Date(timestamp.seconds * 1000);

  if (isNaN(date.getTime())) {
    return '';
  }

  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

// MM:SS 형식으로 시간 포맷
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 총 숙박 일수
export const totalDays = (checkIn, checkOut) => {
  const format = 'yyyy. M. d.';
  const checkInDate = parse(checkIn, format, new Date());
  const checkOutDate = parse(checkOut, format, new Date());

  // 총 숙박 일수 계산
  const days = differenceInDays(checkOutDate, checkInDate);

  return days;
};

// yyyy. M. d.형식을 Timestamp로 변환
export const formatToTimestamp = (dateStr) => {
  const parsedDate = parse(dateStr, 'yyyy. M. d.', new Date());
  return Timestamp.fromDate(parsedDate);
};

// 오늘과 비교
export const compareToday = (timestamp) => {
  const checkoutDate = new Date(timestamp.seconds * 1000);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  checkoutDate.setHours(0, 0, 0, 0);

  if (today > checkoutDate) {
    return '지난 예약 내역';
  }
};

// 두 날짜 사이의 모든 날짜를 배열로 반환
export const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// YYYY.MM.DD로 변환한 날짜를 Date 객체(YYYY-MM-DD)로 변환
export const convertToDate = (dateStr) => {
  const [year, month, day] = formatDate(dateStr).split('.');

  return new Date(`${year}-${month}-${day}`);
};
