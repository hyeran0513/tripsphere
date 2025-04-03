## 여행 예약 서비스 구축

### **📍 미리보기**

#### 상세 페이지
![Animation128](https://github.com/user-attachments/assets/1cb7f65c-0921-4283-a5d1-a4c8d37b3467)

#### 결제 페이지
![Animation129](https://github.com/user-attachments/assets/2a60c30a-58af-4cb1-b806-6e3380a05c76)

---

### **📍 팀원 역할 및 담당 업무**

| 이름   | 역할 | 담당 업무 |
| ---- | ---- | ---- |
| 김혜란 | 팀장 | 메인페이지,<br/> 상품 목록 페이지,<br/> 상품 상세 페이지(+리뷰),<br/> 내 정보 수정 페이지,<br/> 로그인 및 회원가입 페이지, <br/> 비밀번호 재설정 페이지, <br/> 포인트 내역 페이지, <br/> Firebase 데이터베이스 설계,<br/> UI/UX 설계 |
| 박세진 | 팀원 | 주문 완료 페이지,<br/> 결제 페이지,<br/> UI/UX 설계 |
| 최승이 | 팀원 | 마이페이지,<br/> 찜 목록 페이지,<br/> UI/UX 설계 |
| 형주희 | 팀원 | 주문 내역 페이지,<br/> 장바구니 페이지,<br/> UI/UX 설계 | 

---

### **📍 설치 패키지**

| 패키지명                           | 설치 명령어                                 | 참고 문서                                                                                                                                             |
| ---------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **tailwindcss, @tailwindcss/vite** | `npm install tailwindcss @tailwindcss/vite` | [Tailwind UI Components](https://tailwindui.com/components#product-application-ui-forms), [Tailwind Documentation](https://tailwindcss.com/docs/flex) |
| **daisyui**                        | `npm install -D daisyui@latest`             | [DaisyUI Components](https://daisyui.com/components/button/)                                                                                          |
| **react-router-dom**               | `npm install react-router-dom`              |                                                                                                                                                       |
| **react-icons**                    | `npm install react-icons`                   | [React Icons](https://react-icons.github.io/react-icons/icons/bi/)                                                                                    |
| **@headlessui/react**              | `npm install @headlessui/react`             | [Headless UI](https://headlessui.com/)                                                                                                                |
| **zustand**                        | `npm install zustand`                       |                                                                                                                                                       |
| **@tanstack/react-query**          | `npm install @tanstack/react-query`         |                                                                                                                                                       |
| **firebase**                       | `npm install firebase`                      |                                                                                                                                                       |
| **react-date-range**               | `npm install --save react-date-range`       | [React Date Range](https://github.com/hypeserver/react-date-range)                                                                                    |
| **date-fns**                       | `npm install --save date-fns`               |                                                                                                                                                       |
| **react-use**                      | `npm install react-use`                     |                                                                                                                                                       |
| **kakao-map**                      | `npm install react-kakao-maps-sdk`          | [Kakao maps sdk](https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/)                                                                             |
| **swiper**                         | `npm install swiper`                        |                                                                                                                                                       |
| **react-range**                    | `npm install react-range`                   | [npm] (https://www.npmjs.com/package/react-range)                                                                                                     |
| **react-loader-spinner**           | `npm install react-loader-spinner`          |                                                                                                                                                       |

---

### **📍 주요 기능**

**필수 기능** :

- [x]  회원인증
    - [x]  기본정보 가입 (이메일, 비밀번호, 이름)
    - [x]  로그인
    - [x]  회원가입
- [x]  전체 상품 목록 조회
    - [x]  데이터 베이스에서 상품 목록을 가져옵니다.
    - [x]  이미지, 상품명, 상품가격을 기본으로 출력합니다.
    - [x]  재고에 따라 출력여부를 결정합니다.
    - [x]  페이징을 만듭니다.
- [x]  상품 옵션
    - [x]  상세소개 페이지에서 상품 옵션을 선택합니다.
    - [x]  날짜, 여행인원은 기본입니다.
    - [x]  그 외 필요한 것은 별도로 기획합니다.
- [x]  결제하기
    - [x]  주문 페이지에서 로직 및 절차 없이 주문한것으로 처리합니다.
    - [x]  데이터베이스에 주문 정보를 저장합니다.
- [x]  주문결과확인
    - [x]  결제를 성공적으로 처리하면 주문한 상품결과를 출력합니다.

**선택 기능** :

- [x]  카테고리를 분류하여 상품을 출력합니다.
- [x]  장바구니 담기
    - [x]  이미지, 상품명, 옵션등을 노출시켜 전체 주문합계금액을 노출합니다.
    - [x]  체크박스를 통해 상품을 선택/제외합니다.
    - [x]  주문하기 버튼으로 결제화면으로 이동합니다.
- [x]  주문내역확인
    - [x]  별도 주문 내역페이지에 주문한 이력을 출력합니다.
- [x]  그외 필요한기능을 추가해주세요. (포인트 내역, 찜 기능, 비밀번호 재설정 추가)

---

### **📍 배포 및 시연영상**

**시연 영상**

https://www.youtube.com/watch?v=1Ja1eEiGR60

**배포 URL**

[tripsphere-96e2d.web.app/](https://tripsphere-96e2d.web.app/)

**배포 QR 코드**

![image](https://github.com/user-attachments/assets/452c97b7-3651-4735-b3a5-1b7d4fbeb8f0)
