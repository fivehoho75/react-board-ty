import db from 'database/db';
import Sequelize from 'sequelize';
import shortid from 'shortid';

export interface EmailAuthModel {
  id: number;
  code: string;
  email: string;
  createdAt: string;
  logged: boolean;
  use(): Promise<any>;
}

const EmailAuth = db.define(
  'email_auth',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
      defaultValue: shortid.generate,
    },
    email: Sequelize.STRING,
    logged: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    tableName: 'email_auth',
  }
);

EmailAuth.findCode = function findCode(code: string): Promise<any> {
  return EmailAuth.findOne({
    where: {
      code,
      logged: false,
    },
  });
};

EmailAuth.prototype.use = function use(): Promise<any> {
  return this.update({
    logged: true,
  });
};

export default EmailAuth;
