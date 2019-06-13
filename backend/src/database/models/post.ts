import db from 'database/db';
import { User, UserProfile } from 'database/models';
import pick from 'lodash/pick';
import Sequelize, { Op } from 'sequelize';

const Post = db.define(
  'post',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
    short_description: Sequelize.STRING,
    thumbnail: Sequelize.STRING,
    is_markdown: Sequelize.BOOLEAN,
    is_temp: Sequelize.BOOLEAN,
    fk_user_id: Sequelize.UUID,
    original_post_id: Sequelize.UUID,
    url_slug: Sequelize.STRING,
    likes: {
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
    meta: {
      type: Sequelize.JSONB,
      defaultValue: {},
    },
    views: {
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
    is_private: {
      defaultValue: true,
      type: Sequelize.BOOLEAN,
    },
    released_at: {
      defaultValue: Sequelize.fn('NOW'),
      type: Sequelize.DATE,
    },
  },
  {
    indexes: [
      {
        fields: ['url_slug'],
      },
      {
        fields: ['created_at'],
      },
      {
        fields: ['is_private'],
      },
      {
        fields: ['is_temp'],
      },
      {
        fields: ['released_at'],
      },
      {
        fields: ['fk_user_id'],
      },
    ],
  }
);

Post.associate = () => {
  Post.belongsTo(User, {
    foreignKey: 'fk_user_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
  });
};

Post.listPosts = async () => {
  const cursorData = null;

  try {
    const fullPosts = await Post.findAll({
      include: [
        {
          model: User,
          include: [UserProfile],
        },
        // Tag,
        // Category,
      ],
      order: [['released_at', 'DESC']],
    });
    return {
      data: fullPosts,
    };
  } catch (e) {
    throw e;
  }
};

export const serializePost = (data: any) => {
  const {
    id,
    title,
    body,
    thumbnail,
    is_markdown,
    created_at,
    updated_at,
    released_at,
    url_slug,
    liked,
    likes,
    comments_count,
    is_temp,
    user,
  } = data;

  return {
    id,
    title,
    body,
    thumbnail,
    is_markdown,
    created_at,
    updated_at,
    released_at,
    url_slug,
    likes,
    comments_count,
    is_temp,
    user: {
      ...pick(user, ['id', 'username']),
      ...pick(user.user_profile, ['display_name', 'short_bio', 'thumbnail']),
    },
    liked,
  };
};

Post.readPostById = (id: any) => {
  return Post.findOne({
    attributes: [
      'id',
      'title',
      'body',
      'thumbnail',
      'is_markdown',
      'created_at',
      'updated_at',
      'released_at',
      'url_slug',
      'likes',
      'is_temp',
      'meta',
      'is_private',
    ],
    include: [
      {
        model: User,
        include: [UserProfile],
        attributes: ['username'],
      },
      // Tag,
      // Category,
    ],
    where: {
      id,
    },
  });
};

Post.readPostsByIds = async (postIds: any) => {
  const fullPosts = await Post.findAll({
    include: [
      {
        model: User,
        include: [UserProfile],
      },
      // Tag,
      // Category,
    ],
    where: {
      id: {
        [Op.or]: postIds,
      },
    },
    order: [['released_at', 'DESC']],
  });

  const flatData: any = {};
  fullPosts.forEach((p: any) => {
    flatData[p.id] = p;
  });
  return postIds.map((postId: any) => flatData[postId]);
};

export default Post;
