import { useReducer } from 'react';

const initialState = {
  email: '',
  username: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  point: '',
  errors: {
    email: '',
    username: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    point: '',
  },
  placeholder: {
    email: '이메일을 입력해 주세요.',
    username: '이름을 입력해 주세요.',
    nickname: '닉네임을 입력해 주세요.',
    password: '비밀번호를 입력해 주세요.',
    passwordConfirm: '비밀번호 한번 더 입력해 주세요.',
    phone: '- 없이 숫자만 입력해 주세요.',
    point: '포인트를 입력해 주세요.',
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    case 'SET_PASSWORDCONFIRM':
      return {
        ...state,
        passwordConfirm: action.payload,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_NICKNAME':
      return {
        ...state,
        nickname: action.payload,
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.payload,
      };
    case 'SET_POINT':
      return {
        ...state,
        point: action.payload,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    default:
      return state;
  }
};

export const useAuthForm = () => {
  return useReducer(formReducer, initialState);
};
