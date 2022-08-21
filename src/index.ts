const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');

const koa = new Koa();
var router = new Router();

koa
  .use(router.routes())
  .use(router.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;