import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const EDIT_FIELD = 'write/EDIT_FIELD';

export interface Meta {
  code_theme?: string;
  short_description?: string;
}

export interface PostData {
  id: string;
  title: string;
  body: string;
  thumbnail: string;
  is_markdown: boolean;
  is_temp: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
  categories: Array<{ id: string; name: string }>;
  url_slug: string;
  meta: Meta;
  is_private: boolean;
  series: {
    id: string;
    name: string;
  };
}

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
