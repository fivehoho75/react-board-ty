import produce from 'immer';
import { Action, createAction, handleActions } from 'redux-actions';

const EDIT_FIELD = 'write/EDIT_FIELD';
const SET_INSERT_TEXT = 'write/SET_INSERT_TEXT';

const SET_LAYOUT_MODE = 'write/SET_LAYOUT_MODE';
const RESET = 'write/RESET';

export type LayoutMode = 'editor' | 'both' | 'preview';

export interface WriteExtra {
  visible: boolean;
  layoutMode: LayoutMode;
}

export interface Meta {
  code_theme?: string;
  short_description?: string | null;
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
  meta: Meta;
  postData: PostData | null;
  insertText: string | null;
  writeExtra: WriteExtra;
  changed: boolean;
}

const initialState: Write = {
  body: '',
  title: '',
  meta: {
    code_theme: '',
    short_description: null,
  },
  postData: null,
  insertText: null,
  writeExtra: {
    visible: false,
    layoutMode: 'both',
  },
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
  setInsertText: createAction(SET_INSERT_TEXT, (text: string | null) => text),
  setLayoutMode: createAction(SET_LAYOUT_MODE),
  reset: createAction(RESET),
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
    [SET_INSERT_TEXT]: (state, action: Action<any>) => {
      return produce(state, draft => {
        draft.insertText = action.payload;
      });
    },
    [SET_LAYOUT_MODE]: (state, action: Action<any>) => {
      return produce(state, draft => {
        draft.writeExtra.layoutMode = action.payload;
      });
    },
    [RESET]: () => {
      return initialState;
    },
  },
  initialState
);
