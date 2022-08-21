import 'reflect-metadata';
import './database/connect';

const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');

const koa = new Koa();
var router = new Router();

koa
  .use(router.routes())
  .use(router.allowedMethods());

const server = koa.listen(PORT, () => console.log('🔥 Server started at http://localhost:3000'));

module.exports = server;