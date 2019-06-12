import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth: Router = new Router();

auth.post('/send-auth-email', authCtrl.sendAuthEmail);
auth.get('/code/:code', authCtrl.getCode);

auth.post('/register/local', authCtrl.createLocalAccount);

auth.get('/check', authCtrl.check);

export default auth;
