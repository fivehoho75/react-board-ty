import jwt from 'jsonwebtoken';

const { SECRET_KEY: secret } = process.env;

export const generate = (payload: any, options?: any): Promise<string> => {
  const jwtOptions = {
    issuer: 'localhost',
    expiresIn: '7d',
    ...options,
  };

  if (!jwtOptions.expiresIn) {
    delete jwtOptions.expiresIn;
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret as string, jwtOptions, (err, token) => {
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
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
