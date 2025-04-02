import { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useTermData } from '../../hooks/useTermData';

const TermsAgreement = ({ onAgree }) => {
  const { data: terms = [] } = useTermData();

  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() =>
    Object.fromEntries(terms?.map((item) => [item.title, false])),
  );
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 동의 버튼 클릭
  const handleAgree = () => {
    setIsChecked(true);
    document.getElementById('termsAgreementModal').close();
    onAgree?.();
  };

  // 모든 항목 동의 체크박스 변경
  const handleAllAgreeChange = () => {
    const newState = !isAllChecked;
    setIsAllChecked(newState);
    setCheckedItems(
      Object.fromEntries(terms?.map((item) => [item.title, newState])),
    );
  };

  // 개별 항목 체크박스 변경
  const handleItemChange = (title) => {
    const updatedItems = { ...checkedItems, [title]: !checkedItems[title] };
    setCheckedItems(updatedItems);
    setIsAllChecked(Object.values(updatedItems).every(Boolean));
  };

  return (
    <div className="flex justify-end">
      {/* 약관 동의하기 버튼 */}
      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          checked={isChecked}
          onClick={() =>
            document.getElementById('termsAgreementModal').showModal()
          }
          className="checkbox checkbox-primary"
        />
        <label
          htmlFor="link-checkbox"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          약관 동의하기
        </label>
      </div>

      {/* 약관 동의 모달 */}
      <dialog
        id="termsAgreementModal"
        className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">약관 동의</h3>
          <p className="pt-2 text-sm text-gray-500">
            필수항목 및 선택항목 약관에 동의해 주세요.
          </p>

          {/* 모든 항목 동의 */}
          <div className="pt-8">
            <div className="flex items-center bg-gray-100 py-6 px-4 dark:bg-base-200">
              <input
                id="all-agree"
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllAgreeChange}
                className="checkbox checkbox-primary"
              />
              <label
                htmlFor="all-agree"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                모든 항목 동의하기
              </label>
            </div>

            {/* 약관 목록 */}
            <ul className="list">
              {terms.map((item, index) => (
                <li
                  key={item.title}
                  className="list-row flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={checkedItems[item.title]}
                      onChange={() => handleItemChange(item.title)}
                      className="checkbox checkbox-primary"
                    />

                    <label className="flex items-center gap-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <div className="badge badge-soft badge-info">필수</div>
                      {item.title}
                    </label>
                  </div>

                  {/* 이용약관 상세 보기 버튼 */}
                  <button
                    type="button"
                    className="btn btn-square btn-ghost"
                    onClick={() =>
                      document.getElementById(`term${index}`).showModal()
                    }>
                    <BiChevronRight className="size-8" />
                  </button>

                  <dialog
                    id={`term${index}`}
                    className="modal">
                    <div className="modal-box">
                      {/* 이용약관 제목 */}
                      <h3 className="font-bold text-lg">{item?.title}</h3>

                      {/* 이용약관 설명 */}
                      <pre className="py-4 whitespace-pre-wrap break-words">
                        {item?.description}
                      </pre>

                      {/* 닫기 버튼 */}
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">닫기</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </li>
              ))}
            </ul>
          </div>

          {/* 모달 버튼 */}
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-2">
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById('termsAgreementModal').close()
                  }>
                  취소
                </button>

                <button
                  className={`btn btn-primary ${
                    !isAllChecked ? 'btn-disabled' : ''
                  }`}
                  onClick={handleAgree}
                  disabled={!isAllChecked}>
                  동의
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TermsAgreement;
