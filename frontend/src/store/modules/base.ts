import produce from 'immer';
import { Action, createAction, handleActions } from 'redux-actions';

const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER';
const ENTER_LANDING = 'base/ENTER_LANDING';
const EXIT_LANDING = 'base/EXITLANDING';
const SET_WIDTH = 'base/SET_WIDTH';
const SHOW_TOAST = 'base/SHOW_TOAST';
const HIDE_TOAST = 'base/HIDE_TOAST';

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
  showToast: createAction(
    SHOW_TOAST,
    (payload: { type: string; message: string }) => payload
  ),
  hideToast: createAction(HIDE_TOAST),
};

export interface Base {
  userMenu: boolean;
  fullscreenLoader: boolean;
  landing: boolean;
  windowWidth: number;
  toast: { type: string | null; message: string | null; visible: boolean };
}

const initialState: Base = {
  userMenu: false,
  fullscreenLoader: false,
  landing: true,
  windowWidth: 1920,
  toast: {
    type: null,
    message: null,
    visible: false,
  },
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
    [SHOW_TOAST]: (state, { payload }: Action<any>) => {
      return {
        ...state,
        toast: {
          ...payload,
          visible: true,
        },
      };
    },
    [HIDE_TOAST]: state => {
      return produce(state, draft => {
        draft.toast.visible = false;
      });
    },
  },
  initialState
);
