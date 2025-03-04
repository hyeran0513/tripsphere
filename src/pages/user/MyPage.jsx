import React from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiCog, BiCoin, BiShoppingBag } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[700px] mx-auto">
      {/* 유저 정보 */}
      <div className="flex py-6">
        <div className="w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src="https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
            className="w-full object-cover"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="#">김혜란</a>
              </h3>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                <BiCog />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">(닉네임)</p>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="stats shadow flex">
        <div className="stat flex-1">
          <div className="stat-figure text-primary">
            <BiCoin className="inline-block h-8 stroke-current" />
          </div>
          <div className="stat-title">포인트</div>
          <div className="stat-value text-primary">25</div>
          <div className="stat-desc">보유한 포인트</div>
        </div>

        <Link
          to="/orderhistory"
          className="stat flex-1">
          <div className="stat-figure text-secondary">
            <BiShoppingBag className="inline-block h-8 stroke-current" />
          </div>
          <div className="stat-title">주문내역</div>
          <div className="stat-value text-secondary">2</div>
          <div className="stat-desc">주문한 내역</div>
        </Link>

        <div className="stat flex-1">
          <div className="stat-figure text-accent">
            <BiHeart className="inline-block h-8 stroke-current" />
          </div>
          <div className="stat-title">찜 내역</div>
          <div className="stat-value text-accent">25</div>
          <div className="stat-desc">찜한 상품</div>
        </div>
      </div>

      {/* 찜 목록 */}
      <ul className="mt-8 list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
          <p className="flex items-center gap-2">
            <BiHeart /> 찜 목록
          </p>

          <Link
            to="/favorite"
            className="text-primary font-bold">
            더 보기
          </Link>
        </li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
        </li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/4@94.webp"
            />
          </div>
          <div>
            <div>Ellie Beilish</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Bears of a fever
            </div>
          </div>
        </li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            />
          </div>
          <div>
            <div>Sabrino Gardener</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Cappuccino
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MyPage;
