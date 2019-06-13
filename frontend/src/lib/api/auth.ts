import axios from '../defaultClient';

interface RegisterForm {
  username: string;
  shortBio: string;
  displayName: string;
  fallbackEmail?: string;
}

export interface LocalRegisterPayload {
  registerToken: string;
  form: RegisterForm;
}

export const sendAuthEmail = (email: string): Promise<any> =>
  axios.post('/auth/send-auth-email', { email });

export const getCode = (code: string): Promise<any> =>
  axios.get(`/auth/code/${code}`);

export const localRegister = ({
  registerToken,
  form,
}: LocalRegisterPayload): Promise<any> =>
  axios.post('/auth/register/local', {
    registerToken,
    form,
  });

export const codeLogin = (code: string): Promise<any> =>
  axios.post('/auth/code-login', { code });
export const check = (): Promise<any> => axios.get('/auth/check');
