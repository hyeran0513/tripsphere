import { useCallback, useEffect, useState } from 'react';
import { Range } from 'react-range';
import usePriceStore from '../../stores/usePriceStore';

const PriceSlider = ({ step = 5 }) => {
  const { rangeLimit, range, setRangeMin, setRangeMax } = usePriceStore();

  const [maxInput, setMaxInput] = useState(range.max);
  const [message, setMessage] = useState('');

  // const [values, setValues] = useState([range.min, range.max]);

  const updateByInput = (index, value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    if (index === 0) {
      if (numValue >= range.max) {
        setMessage('최소값은 최대값보다 작아야 합니다.');
        // return;
      }
      setRangeMin(numValue);
    } else {
      if (numValue <= range.min) {
        setMessage('최대값은 최소값보다 커야 합니다.');
        // return;
      }
      setRangeMax(numValue);
      setMaxInput(numValue);
    }
    setMessage('');
  };

  const updateByRangeUI = useCallback(
    (values) => {
      if (values[0] < values[1]) {
        setRangeMin(values[0]);
        setRangeMax(values[1]);
      } else {
        if (values[0] < rangeLimit.max - step) {
          setRangeMin(values[0]);
        } else {
          setRangeMin(rangeLimit.max - step);
        }
        setRangeMax(Math.min(values[0] + step, rangeLimit.max));
      }
    },
    [setRangeMin, setRangeMax, rangeLimit.max, step],
  );

  useEffect(() => {
    if (range.max >= rangeLimit.max) {
      setMaxInput('최대');
    } else {
      setMaxInput(range.max);
    }
  }, [range.min, range.max]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between items-center mb-4 gap-4">
        <label className="flex items-center gap-x-3">
          <span>최소</span>
          <input
            aria-label={`숙소 최소가격 설정. 현재가격 ${range.min} 만원`}
            type="number"
            value={range.min}
            min={rangeLimit.min}
            max={rangeLimit.max}
            step={1}
            onChange={(e) => updateByInput(0, e.target.value)}
            className="border rounded-md px-1 py-1  text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </label>
        ~
        <label className="flex items-center gap-x-3">
          <span>최대</span>
          <input
            aria-label={`숙소 최대가격 설정. 현재가격 ${
              range.max === rangeLimit.max
                ? '최대가격 제한 없음'
                : (range.max, '만원')
            } `}
            type="text"
            value={maxInput}
            onFocus={() => setMaxInput(range.max)}
            onBlur={() =>
              setMaxInput(range.max >= rangeLimit.max ? '최대' : range.max)
            }
            min={rangeLimit.min}
            max={rangeLimit.max}
            step={1}
            onChange={(e) => updateByInput(1, e.target.value)}
            className="border rounded-md px-1 py-1 w-14 text-center"
          />
        </label>
      </div>
      {message && <p className="text-red-500 text-sm">{message}</p>}

      <Range
        aria-label={`숙소 가격 범위 설정 UI. 시작장애인분들은 넘겨주시기 바랍니다.`}
        step={step}
        min={rangeLimit.min}
        max={rangeLimit.max}
        values={[range.min, range.max]}
        onChange={updateByRangeUI}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            aria-label={`숙소 가격 범위 설정 UI. 시작장애인분들은 넘겨주시기 바랍니다.`}
            className="relative bg-gray-300 w-full h-2 rounded">
            {children}
            {[...Array(Math.floor(rangeLimit.max / step))].map((_, i) => (
              <div
                aria-label={`숙소 가격 범위 설정 UI. 시작장애인분들은 넘겨주시기 바랍니다.`}
                key={i}
                className="absolute top-0 h-2 w-px bg-gray-700"
                style={{
                  left: `${(i * 100) / Math.floor(rangeLimit.max / step)}%`,
                }}
              />
            ))}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className="bg-gray-600 w-5 h-5 rounded-full"
          />
        )}
      />
    </div>
  );
};

export default PriceSlider;
