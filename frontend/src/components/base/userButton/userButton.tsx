import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import './userButton.scss';

interface Props {
  thumbnail?: string | null | undefined;
  onClick(): void;
}
const UserButton = ({ onClick, thumbnail }: Props) => {
  return (
    <div className="UserButton">
      <div className="thumbnail" onClick={onClick}>
        <img src={thumbnail || defaultThumbnail} alt="thumbnail" />
      </div>
    </div>
  );
};

UserButton.defaultProps = {
  thumbnail: defaultThumbnail,
};

export default UserButton;
