import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useEffect, useState } from 'react';
import InputField from '../../components/common/InputField';
import { useEditUserData, useUserData } from '../../hooks/useUserData';
import Modal from '../../components/common/Modal';
import { validateForm } from '../../utils/validation';
import Loading from '../../components/common/Loading';

const breadcrumb = [
  { link: '/mypage', text: '마이페이지' },
  { link: '/profile', text: '내 정보 수정' },
];

const Profile = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useAuthForm();
  const { data, isLoading, error } = useUserData();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });
  const [modalType, setModalType] = useState('error');

  const showModal = (type, title, description) => {
    setModalType(type);
    setModalText({ title, description });
    setModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_EMAIL', payload: data.email || '' });
      dispatch({ type: 'SET_PASSWORD', payload: '' });
      dispatch({ type: 'SET_PASSWORDCONFIRM', payload: '' });
      dispatch({ type: 'SET_USERNAME', payload: data.username || '' });
      dispatch({ type: 'SET_NICKNAME', payload: data.nickname || '' });
      dispatch({ type: 'SET_PHONE', payload: data.phone || '' });
    }
  }, [data, dispatch]);

  const { mutate } = useEditUserData(showModal);

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, 'userinfo');

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    const updatedData = {
      email: state.email,
      username: state.username,
      nickname: state.nickname,
      phone: state.phone,
    };

    mutate(updatedData);
  };

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <>
      <form className="max-w-[700px] mx-auto py-[40px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <PageHeader
              title="내 정보 수정"
              breadcrumb={breadcrumb}
              hasBackButton={true}
            />

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                {/* 이메일 */}
                <InputField
                  label="이메일"
                  type="email"
                  value={state.email}
                  placeholder={state.placeholder.email}
                  onChange={(e) =>
                    dispatch({ type: 'SET_EMAIL', payload: e.target.value })
                  }
                  error={state.errors.email}
                  disabled
                />

                {/* 이름 */}
                <InputField
                  label="이름"
                  type="text"
                  value={state.username}
                  placeholder={state.placeholder.username}
                  onChange={(e) =>
                    dispatch({ type: 'SET_USERNAME', payload: e.target.value })
                  }
                  error={state.errors.username}
                />

                {/* 닉네임 */}
                <InputField
                  label="닉네임"
                  type="text"
                  value={state.nickname}
                  placeholder={state.placeholder.nickname}
                  onChange={(e) =>
                    dispatch({ type: 'SET_NICKNAME', payload: e.target.value })
                  }
                  error={state.errors.nickname}
                />

                {/* 연락처 */}
                <InputField
                  label="연락처"
                  type="text"
                  value={state.phone}
                  placeholder={state.placeholder.phone}
                  onChange={(e) =>
                    dispatch({ type: 'SET_PHONE', payload: e.target.value })
                  }
                  error={state.errors.phone}
                />

                <Link to="/">비밀번호 재설정 페이지 (만들 예정)</Link>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={() => navigate('/mypage')}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold shadow-xs">
            취소
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            저장
          </button>
        </div>
      </form>

      {/* 모달 */}
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        text={modalText}
        type={modalType}
        onNavigate={() => navigate('/mypage')}
      />
    </>
  );
};

export default Profile;
