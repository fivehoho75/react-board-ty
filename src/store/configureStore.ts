import modules, { StoreState } from 'store/modules';
import { createStore, Store } from 'redux';

export default function confiqureStore(): Store<StoreState> {
  const store = createStore(
    modules,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
