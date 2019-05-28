import produce, { Draft } from 'immer';
import { createAction, handleActions } from 'redux-actions';

const ENTER_LANDING = 'base/ENTER_LANDING';
const EXIT_LANDING = 'base/EXITLANDING';

export const actionCreators = {
  enterLanding: createAction(ENTER_LANDING),
  exitLanding: createAction(EXIT_LANDING),
};

export interface Base {
  landing: boolean;
}

const initialState: Base = {
  landing: true,
};

export default handleActions(
  {
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
