import 'reflect-metadata';
import './database/connect';

import router from './routes/userRoutes';
import koaBody from 'koa-bodyparser';
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
// const Router = require('koa-router');

const app = new Koa();

app.use(koaBody());

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(PORT, () => console.log('🔥 Server started at http://localhost:3000'));



module.exports = server;