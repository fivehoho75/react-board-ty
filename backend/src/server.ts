import db from 'database/db';
import { associate } from 'database/sync';
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import authToken from 'lib/middlewares/authToken';
import cors from 'lib/middlewares/cors';
import router from './router';

export default class Server {
  app: Koa;
  constructor() {
    this.app = new Koa();
    this.middleware();
    this.initializeDb();
    associate();
  }

  initializeDb(): void {
    db.authenticate().then(
      () => {
        console.log('DB Connection has been established');
      },
      (err: any) => {
        console.error('Unable to connect to the DB:', err);
      }
    );
  }

  middleware(): void {
    const { app } = this;
    app.use(logger());
    app.use(cors);
    app.use(authToken);
    app.use(
      koaBody({
        multipart: true,
      })
    );
    app.use(router.routes()).use(router.allowedMethods());
  }

  listen(port: number): void {
    const { app } = this;
    app.listen(port);
    console.log('Listening to port', port);
  }
}
