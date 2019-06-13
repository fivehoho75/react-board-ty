import produce from 'immer';
import * as PostApi from 'lib/api';
import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';

const GET_TRENDING_POSTS = 'listing/GET_TRENDING_POSTS';
const FLUSH_LIST = 'listing/FLUSH_LIST';

export const actionCreators = {
  getTrendingPosts: createAction(GET_TRENDING_POSTS, PostApi.getTrendingPosts),
  flushList: createAction(FLUSH_LIST),
};

export interface PostItem {
  id: string;
  title: string;
  body: string;
  thumbnail: string | null;
  url_slug: string;
  released_at: string;
  user: {
    id: string;
    username: string;
    display_name: string;
    short_bio: string;
    thumbnail: string | null;
  };
}

export interface ListingSet {
  posts: PostItem[] | null;
  end: boolean;
}

export interface Listing {
  trending: ListingSet;
}

const initialListingSet = {
  end: false,
  posts: null,
};

const initialState: Listing = {
  trending: initialListingSet,
};

interface PostsResponseAction {
  type: string;
  payload: {
    data: PostItem[];
  };
  meta: any;
}

const reducer = handleActions(
  {
    [FLUSH_LIST]: state => state,
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: GET_TRENDING_POSTS,
    onSuccess: (state, action: PostsResponseAction) => {
      return produce(state, draft => {
        draft.trending = {
          end: false,
          posts: action.payload.data,
        };
      });
    },
  },
]);
