import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getAllAccomData = async ({
  selectedCity = '전체',
  selectedSubCity = '전체',
  adultCount = 1,
  childrenCount = 0,
  checkIn = '',
  checkOut = '',
}) => {
  const accomDoc = collection(db, 'accommodations');
  let constraints = [];

  // constraints.push(where('capacity.adults', '>=', adultCount));
  // constraints.push(where('capacity.children', '>=', childrenCount));

  // 도시 대분류 필터
  if (selectedCity === '전체' || selectedCity === '') {
  } else {
    constraints.push(where('location.city', '==', selectedCity));
  }

  // 도시 소분류 지역 필터
  if (selectedSubCity === '전체' || selectedSubCity === '') {
  } else {
    constraints.push(where('location.sub_city', '==', selectedSubCity));
  }

  // 체크인 값 확인 및 조건 걸기
  // const today = new Date();
  // if (checkIn === '') {
  //   console.log('DATE is null. initialize : ', today);
  //   constraints.push(where('check_in', '>=', Timestamp.fromDate(today)));
  // } else {
  //   기본값 설정
  //   constraints.push(
  //     where('check_in', '>=', Timestamp.fromDate(new Date(checkIn))),
  //   );
  // }

  // 체크아웃 기본값 설정
  // let checkOutTimestamp;
  // // Firestore에서 필터링하지 않고, 이후 클라이언트에서 필터링
  // if (checkOut === '') {
  //   today.setDate(today.getDate() + 1);
  //   checkOutTimestamp = Timestamp.fromDate(today);
  // } else {
  //   checkOutTimestamp = Timestamp.fromDate(new Date(checkOut));
  // }

  // console.log('쿼리 조건 : ', ...constraints);

  const q = query(accomDoc, ...constraints);
  // console.log('쿼리 내용 : ', JSON.stringify(q));

  let results = null;
  let accomIds = [];
  // 숙소정보 검색 및 필터링
  try {
    // 숙소정보 검색
    const accomSnap = await getDocs(q);
    console.log('쿼리 결과', accomSnap);
    results = accomSnap.docs.map((doc) => {
      accomIds.push(doc.id);
      return { id: doc.id, ...doc.data() };
    });

    // console.log(' 숙소정보 조회 결과 : ', results);
    // console.log(' 숙소 조회 결과 아이디들 : ', accomIds);
  } catch (error) {
    console.error('숙소 정보 조회 오류', error);
    return [];
  }

  if (results === null || accomIds.length === 0) {
    console.log('조회된 숙소 정보가 없음');
    return [];
  }

  let rooms = [];
  try {
    let roomConstraints = [];

    // 숙소 아이디 기반 필터링
    if (accomIds.length > 0) {
      roomConstraints.push(where('accommodation_id', 'in', accomIds));
    }

    // 체크인 날짜와 체크아웃 날짜 필터링
    const today = new Date();
    if (checkIn === '') {
      console.log('DATE is null. room checkin initialize : ', today);
      constraints.push(where('check_in', '>=', Timestamp.fromDate(today)));
    } else {
      // 기본값 설정
      constraints.push(
        where('check_in', '>=', Timestamp.fromDate(new Date(checkIn))),
      );
    }

    // 체크아웃 기본값 설정
    let checkOutTimestamp;
    // Firestore에서 필터링하지 않고, 이후 클라이언트에서 필터링
    if (checkOut === '') {
      today.setDate(today.getDate() + 1);
      checkOutTimestamp = Timestamp.fromDate(today);
    } else {
      checkOutTimestamp = Timestamp.fromDate(new Date(checkOut));
    }

    // 인원 수
    roomConstraints.push(where('capacity.adults', '>=', adultCount));
    roomConstraints.push(where('capacity.children', '>=', childrenCount));

    // 객실 쿼리
    const roomQuery = query(collection(db, 'rooms'), ...roomConstraints);
    const roomSnap = await getDocs(roomQuery);
    const rooms = roomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 숙소마다 연결된 객실 정보 붙이기
    const accomList = results.map((accom) => {
      // 각 숙소에 맞는 객실들을 필터링하여 매칭
      const accomRooms = rooms.filter(
        (room) => room.accommodation_id === accom.id,
      );

      return {
        ...accom,
        rooms: accomRooms,
      };
    });

    console.log('getAllAccomData 최종: ' + JSON.stringify(accomList));
  } catch (error) {
    console.error('객실 정보 조회 오류', error);
    return [];
  }
};

/*
 테스트 데이터 쿼리 결과 확인 (전체데이터인 배열의 일부 발췌)
  {
    "id": "testhotel1",
    "description": "example",
    "type": "hotel",
    "name": "testhotel1",
    "rating ": 4.8,
    "location": {
      "latitude": 31.111111,
      "longitude": "123.111111",
      "sub_city": "강남구",
      "city": "서울",
      "place_name": "XX동"
    },
    "host": {
      "name": "example",
      "contact": "010-0000-0000",
      "email": "example@test.com"
    },
    "stay_type": "stay",
    "images": [
      "img.example.com"
    ],
    "rooms": [
      {
        "id": "MkBqyIvCtjTY0ENGZLTm",
        "original_price": 100000,
        "capacity": {
          "adults": 2,
          "children": 2
        },
        "services": [
          "wifi",
          "tv",
          "mini_bar"
        ],
        "room_id": "testhotel1-1",
        "type": "suite",
        "images": "img.example.com",
        "name": "스위트 룸",
        "booked_dates ": [
          {
            "check_out": {
              "seconds": 1743400133,
              "nanoseconds": 320000000
            },
            "check_in": {
              "seconds": 1743274183,
              "nanoseconds": 595000000
            }
          }
        ],
        "description": "example",
        "discount_rate": 0.1,
        "check_out": {
          "seconds": 1743487200,
          "nanoseconds": 96000000
        },
        "accommodation_id": "testhotel1",
        "stock": "3",
        "check_in": {
          "seconds": 1743141600,
          "nanoseconds": 302000000
        },
        "availability": "true"
      }
    ]
  },
*/

export const getAllProductData = async ({
  selectedCity = '전체',
  selectedSubCity = '전체',
  adultCount = 0,
  childrenCount = 0,
  checkIn = '',
  checkOut = '',
  // filter,
}) => {
  const accomDoc = collection(db, 'accommodations');
  let constraints = [];

  // filters로 filterStore의 내용을 사용하려 했으나
  // console.log 출력 결과 undefined 없음
  // console.log('필터 내용 : ', filters);
  // console.log(
  //   'selectedCity ,  selectedSubCity ,  adultCount ,  childrenCount,  checkIn ,  checkOut,',
  //   selectedCity,
  //   selectedSubCity,
  //   adultCount,
  //   childrenCount,
  //   checkIn,
  //   checkOut,
  // );
  constraints.push(where('capacity.adults', '>=', adultCount));
  constraints.push(where('capacity.children', '>=', childrenCount));

  // 도시 대분류 필터
  if (selectedCity === '전체' || selectedCity === '') {
  } else {
    constraints.push(where('location.city', '==', selectedCity));
  }

  // 도시 소분류 지역 필터
  if (selectedSubCity === '전체' || selectedSubCity === '') {
  } else {
    constraints.push(where('location.sub_city', '==', selectedSubCity));
  }
  // 쿼리조건에서 시간은 설정 제대로 됨
  // console.log('checkIn,  new Date(checkIn)', checkIn, ' : ', new Date(checkIn));
  // console.log(
  //   'Timestamp.fromDate(new Date(checkIn)) :',
  //   Timestamp.fromDate(new Date(checkIn)),
  // );
  if (checkIn === '') {
    const today = new Date();
    console.log('DATE is null. initialize : ', today);
    constraints.push(where('check_in', '>=', Timestamp.fromDate(today)));
  } else {
    constraints.push(
      where('check_in', '>=', Timestamp.fromDate(new Date(checkIn))),
    );
  }
  let checkOutTimestamp;
  // 체크아웃 날짜 필터
  // Firestore에서 필터링하지 않고, 이후 클라이언트에서 필터링
  if (checkOut) {
    checkOutTimestamp = Timestamp.fromDate(new Date(checkOut));
  }

  // console.log('쿼리 조건 : ', ...constraints);

  const q = query(accomDoc, ...constraints);
  // console.log('쿼리 내용 : ', JSON.stringify(q));
  try {
    const accomSnap = await getDocs(q);
    // console.log('쿼리 결과', accomSnap);
    let results = accomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (checkOutTimestamp) {
      results = results.filter(
        (accom) => accom.check_out.toMillis() <= checkOutTimestamp.toMillis(),
      );
    }

    return results;
  } catch (error) {
    console.error('상품 검색 오류', error);
    return [];
  }
};
