import { bindActionCreators } from 'redux';
import store from 'store';
import { actionCreators as baseActions } from './modules/base';
import { actionCreators as listingActions } from './modules/listing';
import { actionCreators as writeActions } from './modules/write';

const { dispatch } = store;

export const BaseActions = bindActionCreators(baseActions, dispatch);
export const ListingActions = bindActionCreators(listingActions, dispatch);
export const WriteActions = bindActionCreators(writeActions, dispatch);
