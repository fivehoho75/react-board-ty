import db from 'database/db';
import { Category, Post, User, UserProfile } from './models';

export function associate() {
  // configure relations
  User.associate();
  UserProfile.associate();
  // SocialAccount.associate();
  Post.associate();
  Category.associate();
  // PostsCategories.associate();
  // PostsTags.associate();
  // PostLike.associate();
  // Comment.associate();
  // FollowUser.associate();
  // FollowTag.associate();
  // PostHistory.associate();
  // PostImage.associate();
  // Feed.associate();
  // PostScore.associate();
  // PostRead.associate();
  // UrlSlugHistory.associate();
  // EmailCert.associate();
  // UserMeta.associate();
  // UserImage.associate();
  // Series.associate();
  // SeriesPosts.associate();
}
export default function sync() {
  associate();
  db.sync();
}
