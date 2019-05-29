import axios from './defaultClient';

export const getTrendingPosts = () => {
  return axios.get(`/posts/trending`);
};
