import React, { useEffect, useState } from 'react';
import { BiShareAlt } from 'react-icons/bi';

const KakaoShareButton = ({
  hasText,
  title,
  description,
  imageUrl,
  pageUrl,
}) => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
        setIsKakaoLoaded(true);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleShareClick = (e) => {
    e.preventDefault();

    if (window.Kakao && isKakaoLoaded) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: pageUrl,
              webUrl: pageUrl,
            },
          },
        ],
      });
    } else {
      console.log('카카오 SDK가 로드되지 않았거나 초기화되지 않았습니다.');
    }
  };

  return (
    <button
      type="button"
      className="cursor-pointer inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 dark:hover:bg-base-300"
      onClick={handleShareClick}>
      <BiShareAlt
        aria-hidden="true"
        className="-ml-0.5 size-5 text-gray-400"
      />
      {hasText && <span className="ml-1.5 dark:text-white">공유하기</span>}
    </button>
  );
};

export default KakaoShareButton;
