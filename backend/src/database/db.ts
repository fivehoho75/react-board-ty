// tslint:disable-next-line: no-var-requires
const Sequelize = require('sequelize') as any;

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/raw/database.sqlite',
});

export default db;
