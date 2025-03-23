import React from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

const SearchButton = () => (
  <Link
    to="/products"
    className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-5">
    <BiSearch className="text-xl" />
  </Link>
);

export default SearchButton;
