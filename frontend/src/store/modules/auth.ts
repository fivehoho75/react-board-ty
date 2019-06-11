import * as AuthAPI from 'api/auth';
import produce from 'immer';
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

export const actionCreators = {
  setEmailInput: createAction(SET_EMAIL_INPUT, (value: string) => value),
  sendAuthEmail: createAction(SEND_AUTH_EMAIL, AuthAPI.sendAuthEmail),
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
]);
