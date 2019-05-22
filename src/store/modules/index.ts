import { combineReducers } from 'redux';
import { BaseState, BaseReducer } from './base';

export interface StoreState {
  base: BaseState;
}

export default combineReducers({
  base: BaseReducer,
});
