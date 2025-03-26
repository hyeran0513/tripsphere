import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ImageGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* 이미지 미리보기 */}
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 max-h-[500px]">
        {images?.map((image, index) => (
          <SwiperSlide key={`parent-${index}`}>
            <img
              src={image}
              className="w-full h-auto max-h-[500px] rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 이미지 목록 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-4">
        {images?.map((image, index) => (
          <SwiperSlide key={`children-${index}`}>
            <div className="h-[140px] border overflow-hidden rounded-lg">
              <img
                src={image}
                className="w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageGallery;
