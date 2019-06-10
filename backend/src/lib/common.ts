import Joi from 'joi';
import Sequelize from 'sequelize';

export const primaryUUID = {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV1,
  primaryKey: true,
};

export const isUUID = (name: string) => {
  const validation = Joi.validate(name, Joi.string().uuid());
  if (validation.error) {
    return false;
  }
  return true;
};

// validates schema, return 400 error if not valid
export const validateSchema = (ctx: any, schema: any): any => {
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error,
    };
    return false;
  }
  return true;
};

export const escapeForUrl = (text: string): string => {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      ''
    )
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export const generateSlugId = (): string => {
  return `${Math.floor(36 + Math.random() * 1259).toString(
    36
  )}${Date.now().toString(36)}`;
};

export function checkEmpty(text: string) {
  if (!text) {
    return true;
  }
  const replaced = text
    .trim()
    .replace(
      /([\u3164\u115F\u1160\uFFA0\u200B\u0001-\u0008\u000B-\u000C\u000E-\u001F]+)/g,
      ''
    )
    .replace(/&nbsp;/, '');
  if (replaced === '') {
    return true;
  }
  return false;
}

export const filterUnique = (array: string[]): string[] => {
  return [...new Set(array)];
};
