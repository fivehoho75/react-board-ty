import Joi from 'joi';

export const isUUID = (name: string) => {
  const validation = Joi.validate(name, Joi.string().uuid());
  if (validation.error) {
    return false;
  }
  return true;
};
