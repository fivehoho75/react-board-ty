import { bindActionCreators } from 'redux';
import store from 'store';
import { actionCreators as authActions } from './modules/auth';
import { actionCreators as baseActions } from './modules/base';
import { actionCreators as listingActions } from './modules/listing';
import { actionCreators as userActions } from './modules/user';
import { actionCreators as writeActions } from './modules/write';

const { dispatch } = store;

export const AuthActions = bindActionCreators(authActions, dispatch);
export const UserActions = bindActionCreators(userActions, dispatch);
export const BaseActions = bindActionCreators(baseActions, dispatch);
export const ListingActions = bindActionCreators(listingActions, dispatch);
export const WriteActions = bindActionCreators(writeActions, dispatch);
