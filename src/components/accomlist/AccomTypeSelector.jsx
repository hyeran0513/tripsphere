import React from 'react';

const AccomTypeSelector = ({ filters, setFilters, typeMapping }) => {
  return (
    <div className="flex gap-4 mb-10">
      {typeMapping.map((item) => (
        <label
          key={item.value}
          className="flex flex-col flex-1 items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="type"
            value={item.value}
            checked={filters.type === item.value}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
            className="hidden"
          />
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex items-center justify-center w-[50px] h-[50px] ${
                filters.type === item.value ? 'text-indigo-600 font-bold' : ''
              }`}>
              {item.icon}
            </div>
            <span
              className={`text-sm ${
                filters.type === item.value ? 'text-indigo-600 font-bold' : ''
              }`}>
              {item.text}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default AccomTypeSelector;
