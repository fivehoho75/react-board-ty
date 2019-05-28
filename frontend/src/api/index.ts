import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileAsync';

// const adapter = new FileSync('db.json');

export const getTrendingPosts = () => {
  // const query = offset ? `?offset=${offset}` : '';
  // const db = lowdb(adapter);
  return { data: [{ id: 1, title: 'lowdb is awesome' }] };
};
