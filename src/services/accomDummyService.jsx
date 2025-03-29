import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

// 모든 숙소 데이터 제거
export const deleteAllAccommodations = async () => {
  const accommodationsRef = collection(db, 'accommodations');
  const snapshot = await getDocs(accommodationsRef);

  snapshot.forEach(async (docSnapshot) => {
    await deleteDoc(doc(db, 'accommodations', docSnapshot.id));
  });

  console.log('모든 accommodations 데이터 삭제');
};

// 모든 객체 데이터 제거
export const deleteAllRooms = async () => {
  const roomsRef = collection(db, 'rooms');
  const snapshot = await getDocs(roomsRef);

  snapshot.forEach(async (docSnapshot) => {
    await deleteDoc(doc(db, 'rooms', docSnapshot.id));
  });

  console.log('모든 rooms 데이터 삭제');
};

// 모든 장바구니 데이터 제거
export const deleteAllCarts = async () => {
  const cartsRef = collection(db, 'carts');
  const snapshot = await getDocs(cartsRef);

  snapshot.forEach(async (docSnapshot) => {
    await deleteDoc(doc(db, 'carts', docSnapshot.id));
  });

  console.log('모든 carts 데이터 삭제');
};

// 모든 찜 데이터 제거
export const deleteAllFavorites = async () => {
  const user = auth.currentUser;
  const userDocRef = doc(db, 'users', user?.uid);

  await updateDoc(userDocRef, { wishlist: [] });

  console.log('모든 users의 wishlist 데이터 삭제');
};

// 모든 주문 데이터 제거
export const deleteAllOrders = async () => {
  const ordersRef = collection(db, 'orders');
  const snapshot = await getDocs(ordersRef);

  snapshot.forEach(async (docSnapshot) => {
    await deleteDoc(doc(db, 'orders', docSnapshot.id));
  });

  console.log('모든 orders 데이터 삭제');
};

// 숙소 더미 데이터 추가
export const addAccommodations = async () => {
  const accommodationsRef = collection(db, 'accommodations');
  const batch = writeBatch(db);

  const newAccommodations = [];
  newAccommodations.push(
    {
      name: '역삼 아르누보씨티 호텔 앤 레지던스',
      description:
        '최고급 가구와 주방시설을 갖춘 럭셔리한 레지던스형 호텔입니다.\n역삼역과 선릉역 사이에 위치해 강남 어디로든 이동이 편리합니다.',
      host: {
        name: '박기범',
        contact: '16443184',
        email: 'ebizgoco@ebiznetwork.co.kr',
      },
      location: {
        city: '서울',
        latitude: 37.5033786,
        longitude: 127.0428441,
        place_name: '서울특별시 강남구 언주로 506',
        sub_city: '강남구',
      },
      rating: 4.5,
      type: 'hotel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/06/28/16/1280/62bb331b64efe8.30673986.jpg',
        'https://yaimg.yanolja.com/v5/2022/06/28/16/1280/62bb331c400cf3.90430776.jpg',
        'https://yaimg.yanolja.com/v5/2022/06/28/16/1280/62bb331d03ab91.04865466.jpg',
      ],
    },
    {
      name: '글래드 강남 코엑스센터',
      description:
        '한국소비자포럼 주최의 2022 올해의 브랜드 대상 어워드에서 글래드 호텔이 올해의 라이프 스타일 호텔 부문 1위로 선정되었습니다.\nGLAD 체인호텔로, 모던한 디자인의 객실을 보유하고 있습니다.\n삼성역 1번 출구 도보 10초 거리에 위치한, COEX 인근 가장 합리적인 가격의 호텔 입니다.\n코엑스, 도심 공항 터미널, SM Theater, 잠실 종합운동장 등 편의시설이 모두 차량 5분 이내 거리에 위치하고 있습니다.',
      host: {
        name: '김택중',
        contact: '0264745000',
        email: 'rsvn.coexcenter@glad-hotels.com',
      },
      location: {
        city: '서울',
        latitude: 37.508825,
        longitude: 127.064533,
        place_name: '서울특별시 강남구 테헤란로 610',
        sub_city: '강남구',
      },
      rating: 4.6,
      type: 'hotel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/10/26/14/1280/6359424d363cb1.59078840.jpg',
        'https://yaimg.yanolja.com/v5/2022/10/26/14/1280/6359424de84b82.18847058.png',
        'https://yaimg.yanolja.com/v5/2022/10/26/14/1280/6359425137c297.21784553.jpg',
        'https://yaimg.yanolja.com/v5/2022/10/26/14/1280/63594251e5fce7.12827507.jpg',
        'https://yaimg.yanolja.com/v5/2022/10/26/14/1280/635942528face2.15110642.jpg',
      ],
    },
    {
      name: '호텔 소울하다',
      description:
        '서울의 HOT PLACE인 강남에서 심플, 모던, 고급스러움을 컨셉으로 고객님께 다가갑니다.\n숙박을 넘어 새로운 경험을 제공하는 호텔로 소울하다라는 우리말 이름을 사용하여 차별성을 보여줍니다.\n세련되면서 개성과 젊음의 가득한 호텔에서 답답함을 풀어헤치고 진정성을 담은 휴식을 느껴보세요.',
      host: {
        name: '오성덕',
        contact: '0232881100',
        email: 'gm@soulhada.com',
      },
      location: {
        city: '서울',
        latitude: 37.5357123,
        longitude: 126.7369572,
        place_name: '서울특별시 강남구 테헤란로10길 5',
        sub_city: '강남구',
      },
      rating: 4.6,
      type: 'hotel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/10/26/09/1280/6359010f6cb429.36101357.jpg',
        'https://yaimg.yanolja.com/v5/2022/10/26/09/1280/635901105c6ee4.96113845.jpg',
        'https://yaimg.yanolja.com/v5/2022/10/26/09/1280/635901113a7d51.64191724.jpg',
      ],
    },
    {
      name: '노보텔 앰배서더 강남',
      description:
        '조식 PKG 이용 시, (동반 자녀 소인 최대 2인까지 조식 무료제공)\n강남권에 위치한 아코르 계열의 특1급 호텔로서 교통이 편리하고 코엑스에 인접한 최고의 비즈니스 호텔입니다!\n9개의 스위트룸과 332개의 안락한 객실, 최고급 뷔페 등 특1급 호텔에서만 느낄 수 있는 최고급 품격의 완성 :)\n최첨단 시설을 갖춘 수영장, 골프 연습장, 체련장, 사우나, 에어로빅 룸과 조깅 트랙 등이 완비되어 있습니다.',
      host: {
        name: '서정호',
        contact: '025316000',
        email: 'Nagtars@ambatel.com',
      },
      location: {
        city: '서울',
        latitude: 37.5055121,
        longitude: 127.0289196,
        place_name: '서울특별시 강남구 봉은사로 130',
        sub_city: '강남구',
      },
      rating: 4.6,
      type: 'hotel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/6307957c193de7.66392039.jpg',
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/630795806e8196.45029276.jpg',
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/6307957faf3961.12663021.jpg',
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/6307957f009e61.98945366.jpg',
      ],
    },
    {
      name: '호텔 인 나인 강남',
      description:
        "비즈니스의 중심, 코엑스 인근에 위치한 4성급 호텔 '9'는 완벽에 가까운 숫자처럼 최상의 서비스로 모시겠습니다.\n\nHotel in 9은 지하철 봉은사역 3번 출구에서 도보로 1분 거리에 위치한 4성급 호텔입니다. 주변 관광지로는 코엑스몰, 서울 코엑스 컨벤션 센터, 코엑스 아쿠아리움, 압구정 로데오 등이 있습니다. 또한, 삼성역 7번 출구에서 도보로 약 7분 거리에 위치하여 서울의 다른 지역으로의 이동이 편리합니다. \n\n객실은 총 152개로 구성되어 있으며, 43인치 TV, 개인 금고, 냉장고, 에어컨, 캡슐 커피와 커피 머신이 완비되어 있습니다. 모든 객실에는 유무선 인터넷이 제공되며, 비데, 샤워부스, 목욕 가운도 구비되어 있습니다. \n\n21층 스카이라운지에 위치한 FESTIVA 레스토랑에서는 아름다운 전망을 보며 식사를 즐기실 수 있습니다.",
      host: {
        name: '최홍윤',
        contact: '023119000',
        email: 'hotelin9@gmail.com',
      },
      location: {
        city: '서울',
        latitude: 37.5155551,
        longitude: 127.0600847,
        place_name: '서울특별시 강남구 영동대로 618',
        sub_city: '강남구',
      },
      rating: 4.6,
      type: 'hotel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/6307957c193de7.66392039.jpg',
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/630795806e8196.45029276.jpg',
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/6307957faf3961.12663021.jpg',
        'https://yaimg.yanolja.com/v5/2022/08/25/15/1280/6307957f009e61.98945366.jpg',
      ],
    },
    {
      name: '가평 헬리오스풀빌라',
      description:
        '24년 신축 풀빌라입니다.\n2개 동으로 이루어져 있으며,\n1층에 수영장과 주방을 비롯한 거실과 화장실 2개와\n2층에 방3개와 화장실2개 별도의 세면대가 준비되어 있어\n고객님들에게 프라이빗하고 쾌적한 객실을 제공 합니다.',
      host: {
        name: '김종영, 문성식',
        contact: '050350532287',
        email: 'sm201407@staymg.com',
      },
      location: {
        city: '경기',
        latitude: 37.814842,
        longitude: 127.4481589,
        place_name: '경기도 가평군 가평읍 태봉두밀로 494-37',
        sub_city: '가평군',
      },
      rating: 4.6,
      type: 'pension',
      images: [
        'https://yaimg.yanolja.com/v5/2025/01/04/01/1280/67788e31a68b35.12454781.jpg',
        'https://yaimg.yanolja.com/v5/2025/01/04/01/1280/67788e32408ea5.22178439.jpg',
        'https://yaimg.yanolja.com/v5/2025/01/04/01/1280/67788e33078954.31035281.jpg',
      ],
    },
    {
      name: '가평 하루가평펜션',
      description:
        '※ 에디터 TIP\n1. 하루가평 펜션의 고객은 낮 시간에 평상 무료 이용 가능합니다.\n2. 전 객실 개별BBQ가 가능하며 숯불 바베큐장(공용)이 별도 마련되어 있습니다.\n3. 전 객실 개별 야외 수영장 이용 가능 (겨울철 이용 불가)\n4. 수영장 커버 인클로저가 설치된 객실 (101.102. 202)\n5. 전 객실 개별 바베큐 및 OTT 서비스 이용 가능',
      host: {
        name: '신효인',
        contact: '050350579127',
        email: 'shinsg1115@hanmail.net',
      },
      location: {
        city: '경기',
        latitude: 37.8146562,
        longitude: 127.450749,
        place_name: '경기도 가평군 가평읍 태봉두밀로 475',
        sub_city: '가평군',
      },
      rating: 4.5,
      type: 'pension',
      images: [
        'https://yaimg.yanolja.com/v5/2024/12/26/04/1280/676ce1c257c322.79610863.jpg',
        'https://yaimg.yanolja.com/v5/2024/12/26/04/1280/676ce1c3311f77.52741036.jpg',
        'https://yaimg.yanolja.com/v5/2024/12/26/04/1280/676ce1c5898514.21677245.jpg',
        'https://yaimg.yanolja.com/v5/2024/12/26/04/1280/676ce1c496b2e3.08255946.jpg',
        'https://yaimg.yanolja.com/v5/2024/12/26/04/1280/676ce1c5100739.21235865.jpg',
      ],
    },
    {
      name: '가평 까사노블V풀빌라',
      description: '안녕하세요. 가평 까사노블V풀빌라입니다.',
      host: {
        name: '박광재',
        contact: '050350590267',
        email: '01197775359@naver.com',
      },
      location: {
        city: '경기',
        latitude: 37.797005,
        longitude: 127.5076597,
        place_name: '경기도 가평군 가평읍 호반로 2329-61',
        sub_city: '가평군',
      },
      rating: 4.0,
      type: 'pension',
      images: [
        'https://yaimg.yanolja.com/v5/2025/01/25/10/1280/6794b916d7d944.07169048.jpg',
        'https://yaimg.yanolja.com/v5/2025/01/25/10/1280/6794b917621df8.57107150.jpg',
        'https://yaimg.yanolja.com/v5/2025/01/25/10/1280/6794b917d5cb32.43289822.jpg',
      ],
    },
    {
      name: '가평 와우키즈풀빌라',
      description:
        '사계절 언제나 따뜻한 물놀이가 가능한 와우키즈풀빌라입니다.\n* 23년 5월 정글짐 리뉴얼 완료(마,바,사,아 객실)\n* 아이들과 함께 불멍 가능~ (바 객실제외)\n* 아이들의 안전을 위한 안전매트 시공완료\n* 야외 놀이터 놀이시설 완비\n* 아이들을 위하여, 상비약 상시구비\n* 입실~퇴실까지 온도 유지되는 개별 미온수 수영장 보유',
      host: {
        name: '임명희',
        contact: '050350593138',
        email: 'venus762003@naver.com',
      },
      location: {
        city: '경기',
        latitude: 37.804918,
        longitude: 127.448853,
        place_name: '경기도 가평군 가평읍 북한강변로 481-25',
        sub_city: '가평군',
      },
      rating: 4.0,
      type: 'pension',
      images: [
        'https://yaimg.yanolja.com/v5/2024/12/06/07/1280/6752a310ca7368.92898056.jpg',
      ],
    },
    {
      name: '가평 댕댕이애견펜션실버',
      description: '안녕하세요. 가평 댕댕이애견펜션실버입니다.',
      host: {
        name: '손기훈, 한복경',
        contact: '050350539864',
        email: 'fin@trip11.co.kr',
      },
      location: {
        city: '서울',
        latitude: 37.8503903,
        longitude: 127.5092088,
        place_name: '경기도 가평군 가평읍 복장포길 118-3',
        sub_city: '강남구',
      },
      rating: 4.5,
      type: 'hotel',
      images: [
        'https://yaimg.yanolja.com/v5/2024/11/15/10/1280/67371fa0ea9ac3.01996822.jpg',
        'https://yaimg.yanolja.com/v5/2024/11/15/10/1280/67371fa1d703e6.77988897.jpg',
      ],
    },
    {
      name: '양평 글램핑&카라반',
      description:
        '경기도 양평에 위치한 실내 글램핑장과 독일 하비카라반에서 편히 쉬다 가실 수 있습니다.',
      host: {
        name: '안병구',
        contact: '050350529587',
        email: 'albang2002@naver.com',
      },
      location: {
        city: '경기',
        latitude: 37.5861539,
        longitude: 127.6775904,
        place_name: '경기도 양평군 단월면 단월로 600',
        sub_city: '양평군',
      },
      rating: 3.5,
      type: 'camping',
      images: [
        'https://yaimg.yanolja.com/v5/2024/09/04/11/1280/66d8491cbc7502.50230503.jpg',
        'https://yaimg.yanolja.com/v5/2023/07/26/09/1280/64c0e81b9caeb2.61304237.jpeg',
        'https://yaimg.yanolja.com/v5/2023/07/26/09/1280/64c0e81b8ba327.45722738.jpeg',
        'https://yaimg.yanolja.com/v5/2023/07/26/09/1280/64c0e81b7a0b85.52612334.jpg',
      ],
    },
    {
      name: '가평 동물카라반펜션',
      description:
        '아침고요수목원의 수려한 자연,펜션주변 잣나무 숲의 맑은공기,사계절 흐르는 계곡이 있는 곳\n저희 펜션은 주위가 잣나무숲으로 둘러싸여 맑은 공기를 마시며 계곡의 맑은 물과\n자연과 더불어 동화 될 수 있는 주변 여건을 갖춘 펜션입니다.',
      host: {
        name: '이경희',
        contact: '050350529819',
        email: 'lkh99111@naver.com',
      },
      location: {
        city: '경기',
        latitude: 37.748393,
        longitude: 127.360105,
        place_name: '경기도 가평군 상면 임초밤안골로 313',
        sub_city: '가평군',
      },
      rating: 4.5,
      type: 'camping',
      images: [
        'https://yaimg.yanolja.com/v5/2020/02/25/16/1280/5e54d0b2ef95a5.44638934.jpg',
        'https://yaimg.yanolja.com/v5/2020/02/28/10/1280/5e586b201e7e35.22133103.jpg',
        'https://yaimg.yanolja.com/v5/2020/02/28/10/1280/5e586b36ed7742.84899474.jpg',
        'https://yaimg.yanolja.com/v5/2020/02/25/16/1280/5e54d0b1ad5c83.16616678.jpg',
      ],
    },
    {
      name: '영월 스타글램핑',
      description:
        '저희 영월 Star 글램핑은 캠핑의 대명사로 불리는 청정 법흥계곡에 위치하고 있으며\n방문해 주시는 분들이 일상에 지친 몸과 마음을 편안한 휴식을 통해 마음껏 힐링하고\n돌아갈 수 있도록 다양한 편의시설을 제공하고 안전한 글램핑과 즐길꺼리를 제공하고 있습니다.',
      host: {
        name: '백경철',
        contact: '050350525796',
        email: 'kcheol7976@naver.com',
      },
      location: {
        city: '경기',
        latitude: 37.3522787,
        longitude: 128.2791835,
        place_name: '강원특별자치도 영월군 무릉도원면 무릉법흥로 1078-16',
        sub_city: '가평군',
      },
      rating: 4.5,
      type: 'camping',
      images: [
        'https://yaimg.yanolja.com/v5/2021/07/06/16/1280/60e480bb43a087.59238567.jpg',
        'https://yaimg.yanolja.com/v5/2021/07/06/16/1280/60e4828ab89205.19544304.jpg',
        'https://yaimg.yanolja.com/v5/2021/07/06/16/1280/60e4828e76a706.06235156.jpg',
      ],
    },
    {
      name: '영월 달콤하우스',
      description:
        '1,200평 넓은 공간을 먼저 예약한 한팀이 독채로 이용하시는 펜션입니다.\n밤하늘 별이 쏟아지는 달콤하우스에서 새소리와 물소리를 함께 들으며 자연에서 즐기는 진정한 휴식을 느껴보세요.\n주변 동강 전망이 좋고 앞마당에 메타세콰이어 길이 마음을 풍요롭게 합니다.\nA, B타입 모두 먼저 예약한 분이 독채로 이용하실 수 있습니다.',
      host: {
        name: '정선아',
        contact: '050350527116',
        email: 'nayoukj@naver.com',
      },
      location: {
        city: '강원',
        latitude: 37.2360516,
        longitude: 128.5076514,
        place_name: '강원도 영월군 영월읍 동강로 871-19',
        sub_city: '영월군',
      },
      rating: 5.0,
      type: 'camping',
      images: [
        'https://yaimg.yanolja.com/v5/2022/03/08/19/1280/6227ae5bd16857.12736285.jpg',
        'https://yaimg.yanolja.com/v5/2022/06/20/18/1280/62b0c073647b96.15301619.jpg',
        'https://yaimg.yanolja.com/v5/2022/03/11/11/1280/622b2bf35767a7.22900466.jpg',
        'https://yaimg.yanolja.com/v5/2023/03/29/11/1280/64242165124211.71603621.jpeg',
      ],
    },
    {
      name: '속초 밤하늘 글램핑',
      description:
        '속초밤하늘글램핑으로 두 마리 토끼를 잡으세요\n낮에는 즐길거리 가득한 속초여행을, 밤에는 속초밤하늘글램핑에서 편안하고 감성 가득한 글램핑의 추억을 만드세요.\n(동서울에서 2시간 10분대, 속초 IC에서 5분, 속초 주요 관광지 10분대 거리)',
      host: {
        name: '김민철',
        contact: '050305035052411350527116',
        email: 'loginteam@hanmail.net',
      },
      location: {
        city: '강원',
        latitude: 38.2146146,
        longitude: 128.5475587,
        place_name: '강원도 속초시 장성천길 151',
        sub_city: '속초시',
      },
      rating: 5.0,
      type: 'camping',
      images: [
        'https://yaimg.yanolja.com/v5/2020/11/23/18/1280/5fbb81ad8087c3.44335588.jpg',
        'https://yaimg.yanolja.com/v5/2020/11/23/18/1280/5fbb81aec89403.45174928.jpg',
      ],
    },
    {
      name: '양양(하조대) 원 리조트모텔',
      description: '하조대5분,인구해변7분거리 기사문해변 오션뷰 모텔.',
      host: {
        name: '김태윤',
        contact: '050350527729',
        email: 'yooniguy@naver.com',
      },
      location: {
        city: '강원',
        latitude: 38.0071328,
        longitude: 128.7301559,
        place_name: '강원도 양양군 현북면 기사문길 21',
        sub_city: '양양군',
      },
      rating: 5.0,
      type: 'motel',
      images: [
        'https://yaimg.yanolja.com/v5/2021/04/13/14/1280/6075a8362ee000.99543666.jpg',
        'https://yaimg.yanolja.com/v5/2021/04/13/14/1280/6075a819ad9583.52683935.jpg',
        'https://yaimg.yanolja.com/v5/2021/05/17/10/1280/60a23fd3cb5e84.58845363.jpg',
      ],
    },
    {
      name: '양양 JM 무인텔',
      description: '하조대5분,인구해변7분거리 기사문해변 오션뷰 모텔.',
      host: {
        name: '박승원',
        contact: '050350517785',
        email: 'jmms8181@naver.com',
      },
      location: {
        city: '강원',
        latitude: 38.1288689,
        longitude: 128.5822228,
        place_name: '강원도 양양군 강현면 진미로 348-10',
        sub_city: '양양군',
      },
      rating: 3.5,
      type: 'motel',
      images: [
        'https://yaimg.yanolja.com/v5/2024/11/18/06/1280/673ad895a182d5.49033304.jpg',
        'https://yaimg.yanolja.com/v5/2024/11/18/06/1280/673ad8a2ba4835.82120237.jpg',
      ],
    },
    {
      name: '양양 오렌지',
      description: '전객실 넷플릭스,왓차,티빙,유투브 프리미엄 무제한서비스',
      host: {
        name: '박순규',
        contact: '050350502782',
        email: 'aassdd351125@gmail.com',
      },
      location: {
        city: '강원',
        latitude: 38.1549249,
        longitude: 128.6076207,
        place_name: '강원도 양양군 강현면 물치1길 22-1',
        sub_city: '양양군',
      },
      rating: 3.5,
      type: 'motel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/06/08/17/1280/62a0dbf2ada053.38491851.jpg',
        'https://yaimg.yanolja.com/v5/2022/06/08/17/1280/62a0dbf2b5fc59.93126991.jpg',
        'https://yaimg.yanolja.com/v5/2022/06/08/17/1280/62a0dbf2c4ac93.65960959.jpg',
      ],
    },
    {
      name: '충주 힐링 무인텔',
      description: '객실 내 최고사양 PC 보유',
      host: {
        name: '남천우',
        contact: '0438434010',
        email: 'goldcw123@hanmail.net',
      },
      location: {
        city: '충북',
        latitude: 36.9688417,
        longitude: 127.9354852,
        place_name: '충청북도 충주시 성남2길 18-1',
        sub_city: '충주시',
      },
      rating: 3.5,
      type: 'motel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/09/13/11/1280/63206d25674330.91116082.jpg',
        'https://yaimg.yanolja.com/v5/2018/02/28/15/1280/5a96476008cda6.67953440.jpg',
        'https://yaimg.yanolja.com/v5/2018/02/28/15/1280/5a964762726390.44679940.jpg',
      ],
    },
    {
      name: '제주 하루',
      description:
        '호텔 HARU는 2022년 2월 22일 새롭게 리뉴얼 된 모습으로 고객님들께 찾아뵙게 되었습니다\n공항에서 5분 거리, 깨끗하고 안락한, 주변 맛집이 가득한, 가성비가 좋은,\n호텔 HARU는 전문 소독(방역) 업체와 계약을 맺어 주기적으로 소독 방역을 실시하고 있습니다\n스탠다드, 디럭스 타입별로 객실이미지와 배정된 객실은 인테리어가 상이 할수 있습니다',
      host: {
        name: '나승재',
        contact: '050350527067',
        email: 'jaejuharu@naver.com',
      },
      location: {
        city: '제주',
        latitude: 33.4911208,
        longitude: 126.4895521,
        place_name: '제주특별자치도 제주시 삼무로1길 3',
        sub_city: '제주시',
      },
      rating: 3.5,
      type: 'motel',
      images: [
        'https://yaimg.yanolja.com/v5/2022/03/15/13/1280/623097d9b83898.45434650.jpg',
        'https://yaimg.yanolja.com/v5/2022/03/15/13/1280/623097d9b8f674.46911096.jpg',
        'https://yaimg.yanolja.com/v5/2022/03/15/13/1280/623097d9ba3ce9.44416796.jpg',
        'https://yaimg.yanolja.com/v5/2022/03/15/13/1280/623097d9baaa49.30484985.jpg',
      ],
    },
    {
      name: '전주 한옥마을 인디고',
      description: '수제 유자차와 토스트.계란 무료제공',
      host: {
        name: '안진하',
        contact: '050350529933',
        email: 'agh1882@naver.com',
      },
      location: {
        city: '제주',
        latitude: 35.8196952,
        longitude: 127.1522039,
        place_name: '전라북도 전주시 완산구 은행로 5-9',
        sub_city: '제주시',
      },
      rating: 3.5,
      type: 'guesthouse',
      images: [
        'https://yaimg.yanolja.com/v5/2024/09/04/12/1280/66d84cb07279b8.71820674.jpg',
        'https://yaimg.yanolja.com/v5/2024/09/04/12/1280/66d84cab71bc27.02711686.jpg',
        'https://yaimg.yanolja.com/v5/2024/05/27/14/1280/66549ce2701567.42695693.jpeg',
      ],
    },
    {
      name: '전주 안녕제제 게스트하우스',
      description:
        '전주한옥마을에 위치한 안녕제제는 자연친화적인 내추럴한 감성의 힐링 게스트하우스입니다.',
      host: {
        name: '조희재',
        contact: '050350529385',
        email: 'starmaru798@naver.com',
      },
      location: {
        city: '전북',
        latitude: 35.8176774,
        longitude: 127.1494163,
        place_name: '전라북도 전주시 완산구 전동성당길 33-9',
        sub_city: '전주시 완산구',
      },
      rating: 3.5,
      type: 'guesthouse',
      images: [
        'https://yaimg.yanolja.com/v5/2023/03/23/17/1280/641c8864260dc3.33974343.jpg',
        'https://yaimg.yanolja.com/v5/2023/03/23/17/1280/641c8863e946e2.20331979.jpg',
        'https://yaimg.yanolja.com/v5/2023/03/23/17/1280/641c8863eda788.84752100.jpg',
        'https://yaimg.yanolja.com/v5/2023/03/23/17/1280/641c8863f21d95.39390139.jpg',
      ],
    },
    {
      name: '전주 한옥마을 덕수궁 한옥스테이',
      description:
        '전주 한옥마을을 도보 3분 내로 도착할 수 있는 신축 한옥입니다.\n한국관광품질인증을 받은 한옥스테이 입니다.\n＊덕수궁은 2인실 (1인 1침구 싱글+싱글), 2인실 (퀸침대) 객실있습니다.\n＊각종 어메니티 (칫솔, 치약, 클렌징폼, 바디타올 등) 구비되어 있습니다.\n＊덕수궁 전용 주차장이 있습니다. (입실 전 후 무료주차 가능합니다.)',
      host: {
        name: '김경희',
        contact: '050350526677',
        email: 'bos95@naver.com',
      },
      location: {
        city: '전북',
        latitude: 35.8166144,
        longitude: 127.1557394,
        place_name: '전라북도 전주시 완산구 간납로 10',
        sub_city: '전주시 완산구',
      },
      rating: 3.5,
      type: 'guesthouse',
      images: [
        'https://yaimg.yanolja.com/v5/2023/03/29/15/1280/64245633dd5170.25551168.jpg',
        'https://yaimg.yanolja.com/v5/2023/03/29/15/1280/6424566a46f439.41783159.jpg',
        'https://yaimg.yanolja.com/v5/2023/03/29/15/1280/6424566a58a362.06610779.jpg',
      ],
    },
    {
      name: '소노문 해운대(소노호텔앤리조트)',
      description: '★ 해운대 해수욕장 도보5분 거리 신규 호텔',
      host: {
        name: '이광수',
        contact: '15884888',
        email: 'webmaster@daemyungsono.com',
      },
      location: {
        city: '부산',
        latitude: 35.1599213,
        longitude: 129.15796,
        place_name: '부산광역시 해운대구 해운대해변로237번길 12',
        sub_city: '해운대구',
      },
      rating: 3.5,
      type: 'resort',
      images: [
        'https://yaimg.yanolja.com/v5/2024/05/29/14/1280/66573c91eb9d64.12010940.jpg',
        'https://yaimg.yanolja.com/v5/2024/05/29/13/1280/665734d3030860.24351523.jpg',
        'https://yaimg.yanolja.com/v5/2024/07/10/14/1280/668e95265252d0.31284110.jpg',
        'https://yaimg.yanolja.com/v5/2024/07/10/14/1280/668e952655f232.73606740.jpg',
      ],
    },
  );

  const accommodationIds = [];

  for (const data of newAccommodations) {
    const docRef = doc(accommodationsRef);
    batch.set(docRef, data);
    accommodationIds.push(docRef.id);
  }

  await batch.commit();

  return accommodationIds;
};

// 객체 더미 데이터 추가
export const addRooms = async (accommodationIds) => {
  const roomsRef = collection(db, 'rooms');
  const batch = writeBatch(db);

  const newRooms = [
    {
      availability: true,
      capacity: { adults: 4, children: 5 },
      check_in: new Date('2025-03-29T14:52:09+09:00'),
      check_out: new Date('2025-04-05T14:52:36+09:00'),
      description:
        '만 19세 미만 청소년 혼숙은 법적으로 불가하며, 이에 대한 숙소의 입실 거부 시 취소/환불이 불가합니다.\n만 19세 미만 청소년 예약에 대한 숙소의 입실 거부 시 취소/환불이 불가하오니, 예약 전 반드시 숙소에 확인하시기 바랍니다.',
      discount_rate: 0.5,
      images: [
        'https://yaimg.yanolja.com/v5/2022/06/08/17/1280/62a0dbaf2e94a2.34117913.jpg',
      ],
      name: 'A-타입',
      original_price: 40000,
      services: ['wifi', 'parking', 'barbecue'],
      stay_type: 'stay',
      stock: 3,
      type: 'double',
      room_group_id: 'room_002',
    },
    {
      availability: true,
      capacity: { adults: 4, children: 2 },
      check_in: new Date('2025-03-29T14:00:00+09:00'),
      check_out: new Date('2025-03-29T16:30:00+09:00'),
      description:
        '주차 시설을 보유한 숙소입니다. (차량 이용 시 숙소에 문의해 주세요.)\n객실은 체크인 시 배정되며 사진과 다를 수 있습니다.',
      discount_rate: 0.1,
      images: [
        'https://yaimg.yanolja.com/v5/2022/06/08/17/1280/62a0dba4473fe8.39177492.jpg',
      ],
      name: 'B-타입',
      original_price: 40000,
      services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
      stay_type: 'day_use',
      stock: 2,
      type: 'single',
      room_group_id: 'room_001',
    },
  ];

  // 모든 숙소에 대해 객실을 추가
  accommodationIds.forEach((accommodationId) => {
    newRooms.forEach((room) => {
      const roomData = { ...room, accommodation_id: accommodationId };
      const docRef = doc(roomsRef);
      batch.set(docRef, roomData);
    });
  });

  await batch.commit();
};
