// tslint:disable-next-line: no-var-requires
const Sequelize = require('sequelize') as any;

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PW } = process.env;

const db = new Sequelize('velog', POSTGRES_USER, POSTGRES_PW, {
  host: POSTGRES_HOST || 'public',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default db;
