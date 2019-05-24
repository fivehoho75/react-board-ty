import produce, { Draft } from 'immer';
import { createAction, handleActions } from 'redux-actions';

const GET_POSTS = 'listing/GET_RECENT_POSTS';

export const actionCreators = {
  getPosts: createAction(GET_POSTS),
};

export interface PostItem {
  id: string;
  title: string;
}

export interface ListingSet {
  posts: PostItem[] | null;
  end: boolean;
}

export interface Listing {
  board: ListingSet;
}

const initialListingSet = {
  posts: null,
  end: false,
};

const initialState: Listing = {
  board: initialListingSet,
};
