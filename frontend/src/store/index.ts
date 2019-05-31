import configure from './configure';
import { Base } from './modules/base';
import { Listing } from './modules/listing';
import { Write } from './modules/write';

const store = configure(
  typeof window === 'undefined' ? undefined : (window as any).__REDUX_STATE__
);

// eslint-disable-next-line
export interface StoreState {
  base: Base;
  listing: Listing;
  write: Write;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
}

export default store;
