import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth: Router = new Router();

auth.post('/send-auth-email', authCtrl.sendAuthEmail);

export default auth;
