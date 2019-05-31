import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const EDIT_FIELD = 'write/EDIT_FIELD';

export interface Write {
  body: string;
  title: string;
  changed: boolean;
}

const initialState: Write = {
  body: '',
  title: '',
  changed: false,
};

interface EditFieldPayload {
  field: string;
  value: string;
}

interface EditFieldAction {
  type: string;
  payload: EditFieldPayload;
  meta: any;
}

export const actionCreators = {
  editField: createAction(EDIT_FIELD, (payload: EditFieldPayload) => payload),
};

export default handleActions(
  {
    [EDIT_FIELD]: (state, { payload }: EditFieldAction) => {
      const { field, value } = payload;
      return produce(state, draft => {
        // @ts-ignore
        draft[field] = value;
        draft.changed = true;
      });
    },
  },
  initialState
);
