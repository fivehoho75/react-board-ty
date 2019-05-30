import produce, { Draft } from 'immer';
import { createAction, handleActions } from 'redux-actions';

const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const ENTER_LANDING = 'base/ENTER_LANDING';
const EXIT_LANDING = 'base/EXITLANDING';

export const actionCreators = {
  enterLanding: createAction(ENTER_LANDING),
  exitLanding: createAction(EXIT_LANDING),
  showUserMenu: createAction(SHOW_USER_MENU),
  hideUserMenu: createAction(HIDE_USER_MENU),
};

export interface Base {
  userMenu: boolean;
  landing: boolean;
}

const initialState: Base = {
  userMenu: false,
  landing: true,
};

export default handleActions(
  {
    [SHOW_USER_MENU]: state =>
      produce(state, draft => {
        draft.userMenu = true;
      }),
    [HIDE_USER_MENU]: state =>
      produce(state, draft => {
        draft.userMenu = false;
      }),
    [ENTER_LANDING]: state =>
      produce(state, (draft: Draft<Base>) => {
        draft.landing = true;
      }),
    [EXIT_LANDING]: state =>
      produce(state, (draft: Draft<Base>) => {
        draft.landing = false;
      }),
  },
  initialState
);
