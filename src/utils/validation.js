export const validateForm = (state, mode) => {
  const errors = {};

  if (mode === 'emailPassword' || mode === 'signin') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!state.email || !emailRegex.test(state.email)) {
      errors.email = '유효한 이메일을 입력해 주세요.';
    }

    if (!state.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (state.password.length < 6) {
      errors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    if (mode === 'emailPassword') {
      if (state.password !== state.passwordConfirm) {
        errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      }
    }
  }

  if (mode === 'userinfo') {
    if (!state.username) {
      errors.username = '이름을 입력해 주세요.';
    }

    if (!state.nickname) {
      errors.nickname = '닉네임을 입력해 주세요.';
    }

    if (!state.phone) {
      errors.phone = '연락처를 입력해 주세요.';
    }
  }

  if (mode === 'point') {
    const point = Number(state.point);

    if (!point || point <= 0) {
      errors.point = '유효한 포인트 값을 입력해 주세요.';
    }
  }

  return errors;
};
