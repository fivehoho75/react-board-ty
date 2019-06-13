import PostCard from 'components/base/postCard';
import React, { Fragment } from 'react';
import { PostItem } from 'store/modules/listing';
import './postCardList.scss';

interface Props {
  posts: PostItem[] | null;
  hasEnded: boolean | undefined;
}

const PostCardList = ({ posts, hasEnded }: Props) => {
  if (!posts) {
    return null;
  }

  const columnCount = 3;
  const postList = (hasEnded || posts.length <= 20
    ? posts
    : posts.slice(0, posts.length - (posts.length % columnCount))
  ).map(post => (
    <PostCard
      key={post.id}
      id={post.id}
      thumbnail={post.thumbnail}
      username={post.user.username}
      title={post.title}
      body={post.body}
      date={post.released_at}
      urlSlug={post.url_slug}
    />
  ));
  return (
    <Fragment>
      <div className="PostCardList">
        {postList && postList.length === 0 && (
          <div className="empty-list">아직 작성한 포스트가 없습니다.</div>
        )}
        {postList}
      </div>
    </Fragment>
  );
};

export default PostCardList;
