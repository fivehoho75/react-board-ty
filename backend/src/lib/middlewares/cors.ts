import { Context } from 'koa';

export default (ctx: Context, next: () => Promise<any>) => {
  // ctx.set('Access-Control-Allow-Origin', 'https://velog.io');
  ctx.set('Access-Control-Allow-Origin', '*');
  if (
    ctx.headers.referer &&
    ctx.headers.referer.indexOf('localhost:5000') > -1
  ) {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  }
  ctx.set('Access-Control-Allow-Credentials', 'true');
  return next();
};
