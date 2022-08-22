import UserController from "../app/controllers/UserController";
const Router = require('koa-router');

const userController = new UserController();
const router = new Router();

router.post('/users', userController.create);

export default router;