import { Post } from 'database/models';
import { serializePost } from 'database/models/post';
import Joi from 'joi';
import { Context } from 'koa';

import {
  checkEmpty,
  escapeForUrl,
  filterUnique,
  formatShortDescription,
  generateSlugId,
  isUUID,
  validateSchema,
} from 'lib/common';

export const listTrendingPosts = async (ctx: Context) => {
  // console.log('listTrendingPosts in');
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
    const postIds = await Post.listPosts();
    // console.log('==>>' + JSON.stringify(result));
    if (!postIds || postIds.length === 0) {
      // console.log('==>> null');
      ctx.body = [];
      return;
    }

    /*const posts = await Post.readPostsByIds(
      postIds.data.map((postId: any) => postId.id)
    );*/

    const data: any = postIds.data.map(serializePost).map((post: any) => ({
      ...post,
      body: formatShortDescription(post.body),
    }));

    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const writePost = async (ctx: Context) => {
  interface BodySchema {
    title: string;
    body: string;
    thumbnail: string;
    is_temp: boolean;
    tags: string[];
    url_slug: string;
  }

  // console.log('writePost: ', JSON.stringify(ctx.request));
  // console.log('writePost ctx: ', JSON.stringify(ctx));

  const schema = Joi.object().keys({
    title: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(120),
    body: Joi.string()
      .required()
      .min(1),
    thumbnail: Joi.string()
      .uri()
      .allow(null),
    is_temp: Joi.boolean().required(),
    /* is_private: Joi.boolean(),
     meta: Joi.object(),
    categories: Joi.array()
      .items(Joi.string())
      .required(),*/
    tags: Joi.array()
      .items(Joi.string())
      .required(),
    url_slug: Joi.string()
      .trim()
      .min(1)
      .max(130),
    // series_id: Joi.string().allow(null),
  });

  if (!validateSchema(ctx, schema)) {
    return;
  }

  const {
    title,
    body,
    thumbnail,
    is_temp,
    tags,
    url_slug,
  }: BodySchema = (ctx.request as any).body as BodySchema;

  const uniqueUrlSlug = escapeForUrl(`${title} ${generateSlugId()}`);
  const userUserSlug = url_slug ? escapeForUrl(url_slug) : '';

  const processedSlug = url_slug ? userUserSlug : uniqueUrlSlug;
  /*if (url_slug) {
    try {
      const exists = await Post.checkUrlSlugExistancy({
        userId: 'test',
        urlSlug: url_slug,
      });
      if (exists > 0) {
        processedSlug = uniqueUrlSlug;
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }*/

  const stringsToCheck = [title, body, ...tags];
  for (const item of stringsToCheck) {
    // for (let i = 0; i < stringsToCheck.length; i++) {
    if (checkEmpty(item)) {
      ctx.status = 400;
      ctx.body = {
        name: 'INVALID_TEXT',
      };
      return;
    }
  }

  if (processedSlug === '' || processedSlug.replace(/\./g, '') === '') {
    ctx.status = 400;
    ctx.body = {
      name: 'INVALID_URL_SLUG',
    };
    return;
  }

  const uniqueTags: string[] = filterUnique(tags); // .map(replaceDashToSpace);
  // const uniqueCategories: string[] = filterUnique(categories);

  try {
    // check: all categories are valid
    /*const ownCategories = await Category.listAllCategories(ctx.user.id);
    for (let i = 0; i < uniqueCategories.length; i++) {
      const categoryId = uniqueCategories[i];
      if (ownCategories.findIndex(c => c.id === categoryId) === -1) {
        ctx.status = 400;
        ctx.body = {
          name: 'INVALID_CATEGORY',
          payload: categoryId,
        };
        return;
      }
    }*/

    // const tagIds = await Promise.all(uniqueTags.map(tag => Tag.getId(tag)));
    // create Post data
    console.log('ctx: ', JSON.stringify(ctx.user));
    const post = await Post.build({
      title,
      body,
      thumbnail,
      is_markdown: true,
      fk_user_id: ctx.user.id,
      url_slug: processedSlug,
      is_temp,
    }).save();

    const postId = post.id;
    /*await PostsTags.link(postId, tagIds);
    await PostsCategories.link(postId, uniqueCategories);

    if (series_id) {
      const series = await Series.findById(series_id);
      if (!series) {
        ctx.status = 404;
        ctx.body = {
          name: 'INVALID_SERIES',
        };
        return;
      }
      if (series.fk_user_id !== ctx.user.id) {
        ctx.status = 403;
        return;
      }
      series.changed('updated_at', true);
      await series.save();
      await SeriesPosts.append(series_id, post.id, ctx.user.id);
    }*/

    // const categoriesInfo = await PostsCategories.findCategoriesByPostId(postId);

    console.log('postId: ', postId);
    const postData = await Post.readPostById(postId);
    const serialized = serializePost(postData);

    ctx.body = serialized;

    /*setTimeout(() => {
      if (!is_temp) {
        const tagData = tagIds.map((tagId, index) => ({
          id: tagId,
          name: uniqueTags[index],
        }));
        createFeeds({
          postId,
          userId: ctx.user.id,
          username: ctx.user.username,
          tags: tagData,
        });
      }
      redisClient.remove('/recent');
      redisClient.remove(`/@${ctx.user.username}`);
      tags.forEach(tag => {
        redisClient.remove(`/tags/${tag}`);
        redisClient.remove(`/@${ctx.user.username}/tags/${tag}`);
      });
      refreshSitemap();
    }, 0);*/
  } catch (e) {
    ctx.throw(500, e);
  }
};
