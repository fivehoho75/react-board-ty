import db from 'database/db';
import Sequelize from 'sequelize';

export interface PostModel {
  id: string;
  title: string;
}

const Post = db.define(
  'post',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    released_at: Sequelize.DATE,
  },
  {
    timestamps: false,
  }
);

Post.listPosts = async () => {
  const cursorData = null;

  try {
    const fullPosts = await Post.findAll({
      order: [['released_at', 'DESC']],
    });
    return {
      data: fullPosts,
    };
  } catch (e) {
    throw e;
  }
};

export default Post;
