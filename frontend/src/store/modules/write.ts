import * as PostsAPI from 'api';
import produce from 'immer';
import { Action, createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';

const EDIT_FIELD = 'write/EDIT_FIELD';
const OPEN_SUBMIT_BOX = 'write/OPEN_SUBMIT_BOX';
const CLOSE_SUBMIT_BOX = 'write/CLOSE_SUBMIT_BOX';
const SET_INSERT_TEXT = 'write/SET_INSERT_TEXT';

const SET_LAYOUT_MODE = 'write/SET_LAYOUT_MODE';
const WRITE_POST = 'write/WRITE_POST';
// const UPDATE_POST = 'write/UPDATE_POST';
const RESET = 'write/RESET';

export type LayoutMode = 'editor' | 'both' | 'preview';

export interface WriteExtra {
  visible: boolean;
  layoutMode: LayoutMode;
}

export interface SubmitBox {
  open: boolean;
  tags: string[];
  additional: boolean;
  url_slug: string | null;
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
  thumbnail: string | null;
  title: string;
  meta: Meta;
  submitBox: SubmitBox;
  postData: PostData | null;
  insertText: string | null;
  writeExtra: WriteExtra;
  changed: boolean;
}

const initialState: Write = {
  body: '',
  thumbnail: null,
  title: '',
  meta: {
    code_theme: '',
    short_description: null,
  },
  submitBox: {
    open: false,
    tags: [],
    additional: false,
    url_slug: null,
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
  openSubmitBox: createAction(OPEN_SUBMIT_BOX),
  closeSubmitBox: createAction(CLOSE_SUBMIT_BOX),
  setInsertText: createAction(SET_INSERT_TEXT, (text: string | null) => text),
  setLayoutMode: createAction(SET_LAYOUT_MODE),
  reset: createAction(RESET),
  writePost: createAction(WRITE_POST, PostsAPI.writePost),
  // updatePost: createAction(UPDATE_POST, PostsAPI.updatePost),
};

const reducer = handleActions(
  {
    [EDIT_FIELD]: (state, { payload }: EditFieldAction) => {
      const { field, value } = payload;
      return produce(state, draft => {
        // @ts-ignore
        draft[field] = value;
        draft.changed = true;
      });
    },
    [OPEN_SUBMIT_BOX]: state => {
      return produce(state, draft => {
        draft.submitBox.open = true;
        draft.submitBox.additional = false;
        // draft.seriesModal.visible = false;
      });
    },
    [CLOSE_SUBMIT_BOX]: state =>
      produce(state, draft => {
        draft.submitBox.open = false;
      }),
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

export default applyPenders(reducer, [
  {
    type: WRITE_POST,
    onSuccess: (state: Write, { payload: { data } }) => {
      if (!data) {
        return state;
      }
      return produce(state, draft => {
        draft.changed = false;
        draft.postData = data;
        draft.submitBox.url_slug = data.url_slug;
      });
    },
  },
]);
