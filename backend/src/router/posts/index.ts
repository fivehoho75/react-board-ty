import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts: Router = new Router({});

posts.post('/', postsCtrl.writePost);
posts.get('/trending', postsCtrl.listTrendingPosts);

export default posts;
