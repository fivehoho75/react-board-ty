import Router from 'koa-router';
import posts from './posts';

const router: Router = new Router();

router.use('/posts', posts.routes());

router.get('/check', (ctx: any) => {
  console.log('avoiding cold start...');
  ctx.body = {
    version: '1.0.0',
    origin: ctx.origin,
    env: process.env.NODE_ENV,
  };
});

export default router;
