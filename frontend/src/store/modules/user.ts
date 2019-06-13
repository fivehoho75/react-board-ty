import produce from 'immer';
import * as AuthAPI from 'lib/api/auth';
import { Action, createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';

const CHECK_USER = 'user/CHECK_USER';
const SET_USER = 'user/SET_USER';
const PROCESS_USER = 'user/PROCESS_USER';

export interface UserData {
  id: string;
  username: string;
  displayName: string;
  thumbnail?: string | null;
}
export interface User {
  user: UserData | null;
  processed: boolean;
}

export const actionCreators = {
  checkUser: createAction(CHECK_USER, AuthAPI.check),
  setUser: createAction(SET_USER, (payload: UserData) => payload),
  processUser: createAction(PROCESS_USER),
};

const initialState: User = {
  user: null,
  processed: false,
};

const reducer = handleActions(
  {
    [SET_USER]: (state, action: Action<any>) => {
      return produce(state, (draft: any) => {
        if (!action) {
          return;
        }
        draft.user = action.payload;
      });
    },
    [PROCESS_USER]: (state, action: Action<any>) => {
      return produce(state, (draft: any) => {
        draft.processed = true;
      });
    },
  },
  initialState
);

export default applyPenders(reducer, []);
