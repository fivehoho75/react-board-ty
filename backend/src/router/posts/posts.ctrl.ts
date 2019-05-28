import { Post } from 'database/models';
import { Context } from 'koa';
import { isUUID } from 'lib/common';

export const listTrendingPosts = async (ctx: Context) => {
  console.log('listTrendingPosts in');
  const { username } = ctx.params;

  const { cursor } = ctx.query;

  if (cursor && !isUUID(cursor)) {
    ctx.body = {
      type: 'INVALID_CURSOR_ID',
    };
    ctx.status = 400;
    return;
  }

  try {
    const result = await Post.listPosts();
    if (!result.data) {
      ctx.body = [];
      return;
    }
    const data = result.data;
  } catch (e) {
    ctx.throw(500, e);
  }
};
