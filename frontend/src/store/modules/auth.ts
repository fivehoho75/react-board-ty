import produce from 'immer';
import * as AuthAPI from 'lib/api/auth';
import { Action, createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';

export interface SocialAuthResult {
  provider: string;
  accessToken: string;
}

export interface AuthResult {
  user: {
    id: string;
    username: string;
    displayName: string;
    thumbnail?: string | null;
  };
  token: string;
}

export interface VerifySocialResult {
  id: string;
  thumbnail: string | null;
  email: string | null;
  name: string | null;
  exists: boolean;
}

export interface Auth {
  email: string;
  sentEmail: boolean;
  isUser: boolean;
  registerForm: {
    displayName: string;
    email: string;
    username: string;
    shortBio: string;
  };
  isSocial: boolean;
  registerToken: string;
  authResult: AuthResult | null;
  socialAuthResult: SocialAuthResult | null;
  verifySocialResult: VerifySocialResult | null;
  error: { name: string; payload: any } | null;
  nextUrl: string | null;
  tokenData: {
    type: string | null;
    token: string | null;
  };
}

const initialState: Auth = {
  email: '',
  sentEmail: false,
  isUser: false,
  registerForm: {
    displayName: '',
    email: '',
    username: '',
    shortBio: '',
  },
  isSocial: false,
  registerToken: '',
  authResult: null,
  socialAuthResult: null,
  verifySocialResult: null,
  error: null,
  nextUrl: null,
  tokenData: {
    type: null,
    token: null,
  },
};

const SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT';
const SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL';
const CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM';
const GET_CODE = 'auth/GET_CODE';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const CODE_LOGIN = 'auth/CODE_LOGIN';
const SOCIAL_REGISTER = 'auth/SOCIAL_REGISTER';

const SET_ERROR = 'auth/SET_ERROR';
const SET_NEXT_URL = 'auth/SET_NEXT_URL';

interface ChangeRegisterFormPayload {
  name: string;
  value: string;
}

interface ErrorType {
  name: string;
  payload?: any;
}

export const actionCreators = {
  setEmailInput: createAction(SET_EMAIL_INPUT, (value: string) => value),
  sendAuthEmail: createAction(SEND_AUTH_EMAIL, AuthAPI.sendAuthEmail),
  changeRegisterForm: createAction(
    CHANGE_REGISTER_FORM,
    (payload: ChangeRegisterFormPayload) => payload
  ),
  getCode: createAction(GET_CODE, AuthAPI.getCode),
  localRegister: createAction(LOCAL_REGISTER, AuthAPI.localRegister),
  codeLogin: createAction(CODE_LOGIN, AuthAPI.codeLogin),
  socialRegister: createAction(SOCIAL_REGISTER, AuthAPI.sendAuthEmail),
  setError: createAction(SET_ERROR, (payload: ErrorType) => payload),
  setNextUrl: createAction(SET_NEXT_URL, (payload: string) => payload),
};

const reducer = handleActions(
  {
    [SET_EMAIL_INPUT]: (state, action: Action<string>) => {
      return produce(state, draft => {
        if (!action) {
          return;
        }
        draft.email = action.payload;
      });
    },
    [CHANGE_REGISTER_FORM]: (state, action: Action<any>) => {
      const {
        payload: { name, value },
      } = action;
      return produce(state, draft => {
        // @ts-ignore
        draft.registerForm[name] = value;
      });
    },
    [SET_ERROR]: (state, { payload }: Action<any>) => {
      return produce(state, draft => {
        draft.error = payload;
      });
    },
    [SET_NEXT_URL]: (state, { payload }: Action<any>) => {
      return {
        ...state,
        nextUrl: payload,
      };
    },
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: SEND_AUTH_EMAIL,
    onSuccess: (state: Auth, { payload: { data } }) => {
      return produce(state, draft => {
        draft.sentEmail = true;
        draft.isUser = data.isUser; // TODO: snake_case
      });
    },
  },
  {
    type: GET_CODE,
    onSuccess: (state: Auth, { payload: { data } }) => {
      const { email, registerToken } = data;
      return produce(state, draft => {
        draft.registerForm.email = email;
        draft.registerToken = registerToken;
      });
    },
  },
  {
    type: LOCAL_REGISTER,
    onSuccess: (state: Auth, { payload: { data } }) => {
      const { user, token } = data;
      return produce(state, draft => {
        draft.authResult = {
          user,
          token,
        };
      });
    },
    onFailure: (state: Auth, { payload: { response } }) => {
      return produce(state, draft => {
        draft.error = response.data;
      });
    },
  },
]);
