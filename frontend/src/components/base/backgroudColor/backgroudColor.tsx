import React, { Component } from 'react';

interface Props {
  color: string;
}

class BackgroudColor extends Component<Props> {
  prevColor: string | null = null;

  setBgColor = (color: string) => {
    if (!document.body) {
      return;
    }
    document.body.style.background = color;
  };

  componentDidMount() {
    const { color } = this.props;

    if (!document.body) {
      return;
    }
    this.prevColor = document.body.style.background;
    this.setBgColor(color);
  }

  componentWillUnmount() {
    if (typeof this.prevColor !== 'string') {
      return;
    }
    this.setBgColor(this.prevColor);
  }

  render() {
    return <div />;
  }
}

export default BackgroudColor;
