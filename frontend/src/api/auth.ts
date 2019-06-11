import axios from './defaultClient';

export const sendAuthEmail = (email: string): Promise<any> =>
  axios.post('/auth/send-auth-email', { email });
