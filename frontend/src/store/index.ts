import configure from './configure';
import { Base } from './modules/base';
import { Listing } from './modules/listing';

const store = configure(
  typeof window === 'undefined' ? undefined : (window as any).__REDUX_STATE__
);

// eslint-disable-next-line
export interface StoreState {
  base: Base;
  listing: Listing;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
}

export default store;
