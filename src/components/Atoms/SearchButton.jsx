import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const SearchButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/products')}
      className="cursor-pointer flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-5">
      <BiSearch className="text-xl" />
    </button>
  );
};

export default SearchButton;
