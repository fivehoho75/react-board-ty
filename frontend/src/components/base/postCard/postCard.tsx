import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import './postCard.scss';

interface Props {
  id: string;
  thumbnail: string | null;
  username: string;
  title: string;
  body: string;
  date: string;
  urlSlug: string;
}
const PostCard = ({
  thumbnail,
  username,
  urlSlug,
  title,
  body,
  date,
}: Props) => {
  const formattedDate = date;
  const commentsCount = 1;
  const link = `/@${username}/${urlSlug}`;

  return (
    <div className="PostCard">
      {thumbnail && (
        <Link to={link} className={cx('thumbnail-wrapper')}>
          {thumbnail && <img src={thumbnail} alt={title} />}
          <div className="white-mask" />
        </Link>
      )}
      <div className="card-content">
        <Link className="user-thumbnail-wrapper" to={`/@${username}`}>
          <img src={defaultThumbnail} alt={username} />
        </Link>
        <div className="content-head">
          <h3>{title}</h3>
          <div className="subinfo">
            <span>{formattedDate}</span>
            <span>{commentsCount}개의 댓글</span>
          </div>
        </div>
        <div className="description" style={{ WebkitBoxOrient: 'vertical' }}>
          {body}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
