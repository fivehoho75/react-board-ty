import jwt from 'jsonwebtoken';

const { SECRET_KEY: secret } = process.env;

export const generate = (payload: any, options?: any): Promise<string> => {
  const jwtOptions = {
    issuer: 'velog.io',
    expiresIn: '7d',
    ...options,
  };
  if (!jwtOptions.expiresIn) {
    delete jwtOptions.expiresIn;
  }
  return new Promise((resolve, reject) => {
    // @ts-ignore
    jwt.sign(payload, secret, jwtOptions, ({ err, token }: any) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

export const decode = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!secret) {
      throw new Error('jwt secret missing');
    }
    jwt.verify(token, secret, ({ err, decoded }: any) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
