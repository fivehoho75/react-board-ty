import React from 'react';
import './postCard.scss';

interface Props {
  id?: string;
  title: string;
}
const PostCard = ({ title }: Props) => {
  return (
    <div className="PostCard">
      <div>postCard</div>
      <div>{title}</div>
    </div>
  );
};

export default PostCard;
