import axios from '../defaultClient';

export interface WritePostPayload {
  title: string;
  body: string;
  is_temp: boolean;
  tags: string[];
  // categories: string[];
  thumbnail: string | null;
  url_slug?: string;
  // is_private: boolean;
  // series_id: string | null;
}

export const getTrendingPosts = () => {
  return axios.get(`/posts/trending`);
};

export const writePost = (payload: WritePostPayload) => {
  console.log('writePost: ', JSON.stringify(payload));
  return axios.post('/posts', payload);
};
