import PostCardList from 'components/base/postCardList';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'store';
import { ListingActions } from 'store/actionCreators';
import { PostItem } from 'store/modules/listing';

interface Props {
  posts: PostItem[] | null;
  hasEnded: boolean;
}

class BoardPostCards extends Component<Props> {
  inintialize = async () => {
    if (this.props.posts && this.props.posts.length > 0) {
      return;
    }

    try {
      // if (!this.props.shouldCancel) {
      await ListingActions.getTrendingPosts();
      // }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.inintialize();
  }

  render() {
    return (
      <PostCardList posts={this.props.posts} hasEnded={this.props.hasEnded} />
    );
  }
}

const mapStateToProps = ({ listing }: StoreState) => ({
  hasEnded: listing.trending.end,
  posts: listing.trending.posts,
});

export default connect(
  mapStateToProps,
  () => ({})
)(BoardPostCards);
