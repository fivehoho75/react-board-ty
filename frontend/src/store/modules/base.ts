import produce from 'immer';
import { Action, createAction, handleActions } from 'redux-actions';

const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER';
const ENTER_LANDING = 'base/ENTER_LANDING';
const EXIT_LANDING = 'base/EXITLANDING';
const SET_WIDTH = 'base/SET_WIDTH';

export const actionCreators = {
  enterLanding: createAction(ENTER_LANDING),
  exitLanding: createAction(EXIT_LANDING),
  showUserMenu: createAction(SHOW_USER_MENU),
  hideUserMenu: createAction(HIDE_USER_MENU),
  setFullscreenLoader: createAction(
    SET_FULLSCREEN_LOADER,
    (visibility: boolean) => visibility
  ),
  setWidth: createAction(SET_WIDTH, (width: number) => width),
};

export interface Base {
  userMenu: boolean;
  fullscreenLoader: boolean;
  landing: boolean;
  windowWidth: number;
}

const initialState: Base = {
  userMenu: false,
  fullscreenLoader: false,
  landing: true,
  windowWidth: 1920,
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
    [SET_FULLSCREEN_LOADER]: (state, action: Action<any>) =>
      produce(state, draft => {
        draft.fullscreenLoader = action.payload;
      }),
    [ENTER_LANDING]: state =>
      produce(state, draft => {
        draft.landing = true;
      }),
    [EXIT_LANDING]: state =>
      produce(state, draft => {
        draft.landing = false;
      }),
    [SET_WIDTH]: (state, action: Action<any>) =>
      produce(state, draft => {
        draft.windowWidth = action.payload;
      }),
  },
  initialState
);
