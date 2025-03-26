import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAccomData,
  useFilteredRoomData,
  useRoomOfAccomData,
} from '../../hooks/useProductData';
import ProductGallery from '../../components/detail/gallery/ProductGallery';
import ProductLocation from '../../components/detail/location/ProductLocation';
import ProductReview from '../../components/detail/review/ProductReview';
import { useReviewData } from '../../hooks/useReviewData';
import { BiSolidStar } from 'react-icons/bi';
import RoomList from '../../components/room/RoomList';
import ServiceList from '../../components/common/ServiceList';
import ProductInfo from '../../components/detail/overview/ProductInfo';
import SearchForm from '../../components/detail/search/SearchForm';
import HostInfo from '../../components/detail/services/HostInfo';
import ProductDescription from '../../components/detail/services/ProductDescription';
import ProductHeader from '../../components/detail/header/ProductHeader';
import Loading from '../../components/common/Loading';
import NavBar from '../../components/detail/NavBar';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: reviews, refetch } = useReviewData(id);
  const [openDate, setOpenDate] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [filters, setFilters] = useState(null);

  const { data: filteredRooms } = useFilteredRoomData(id, filters);

  const avgRating =
    reviews && reviews.length
      ? (
          reviews.reduce((acc, cmd) => acc + (cmd.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : '0';

  const handleReFetch = async () => {
    await refetch();
  };

  const { data: accommodation, isLoading, error } = useAccomData(id);
  const {
    data: rooms,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoomOfAccomData(id);

  // 섹션별 ref 설정
  const tabRef = useRef([]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="scroll-smooth w-[1200px] mx-auto">
      <NavBar tabRef={tabRef} />

      <ProductHeader
        product={accommodation}
        productId={id}
      />

      <section
        ref={(el) => (tabRef.current[0] = el)}
        id="overview"
        className="pt-10">
        <ProductGallery product={accommodation} />
        <ProductInfo product={accommodation} />
      </section>

      <section
        ref={(el) => (tabRef.current[1] = el)}
        id="rooms"
        className="pt-[50px]">
        <h1 className="mb-6 text-xl font-semibold">객실</h1>
        <div
          id="container"
          className="flex items-start gap-10 mt-6">
          <RoomList rooms={filters ? filteredRooms : rooms} />

          <SearchForm
            openDate={openDate}
            setOpenDate={setOpenDate}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            datePickerDate={datePickerDate}
            setDatePickerDate={setDatePickerDate}
            setFilters={setFilters}
            filters={filters}
          />
        </div>
      </section>

      <section
        ref={(el) => (tabRef.current[2] = el)}
        id="services"
        className="pt-[50px]">
        <h1 className="text-xl font-semibold">서비스 및 부대시설</h1>
        <ServiceList services={accommodation.services} />
        <HostInfo product={accommodation} />
        <ProductDescription product={accommodation} />
      </section>

      <section
        ref={(el) => (tabRef.current[3] = el)}
        id="location"
        className="pt-[50px]">
        <h1 className="text-xl font-semibold">위치</h1>
        <ProductLocation product={accommodation} />
      </section>

      <section
        ref={(el) => (tabRef.current[4] = el)}
        id="reviews"
        className="pt-[50px]">
        <h1 className="flex gap-2 items-center text-xl font-semibold">
          <div>
            <span>리뷰</span>
            <span className="ml-2 text-gray-400 text-xs">
              ({reviews?.length || 0}개의 댓글)
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <BiSolidStar className="text-orange-400" />
            <span className="text-orange-400">{avgRating}</span>
          </div>
        </h1>

        <ProductReview
          reviews={reviews}
          handleReFetch={handleReFetch}
          avgRating={avgRating}
          productId={id}
        />
      </section>
    </div>
  );
};

export default ProductDetail;
