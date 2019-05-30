import MainMenuItem from 'components/main/mainMenuItem';
import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './mainSidebar.scss';

interface Props {
  url: string;
  searchBox?: ReactNode;
}

export default class MainSidebar extends Component<Props> {
  render() {
    const { url } = this.props;
    return (
      <aside className="MainSidebar">
        <Link to="/" className="logo">
          boardTest
        </Link>
        <ul className="menu">
          <MainMenuItem
            text="섹션1"
            active={['/', '/trending'].indexOf(url) > -1}
            to="/trending"
          />
          <MainMenuItem text="섹션2" active={url === '/recent'} to="/recent" />
        </ul>
        <div className="placer" />
        <div className="footer">
          <Link to="/policy/privacy">서비스 정책</Link>
        </div>
      </aside>
    );
  }
}
