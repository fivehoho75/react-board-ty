// @ts-ignore
import Nano from 'nanobar';
import { Component } from 'react';
import './NanoBar.scss';

interface Props {}

class NanoBar extends Component<Props> {
  nanobar = null;
  componentDidMount() {
    this.nanobar = new Nano({
      classname: 'nanobar',
      id: 'nanobar',
    });
    (window as any).nanobar = this.nanobar;
  }
  remove = () => {
    (window as any).nanobar = null;
    delete this.nanobar;
  };
  render() {
    return null;
  }
}

export default NanoBar;
