import UserController from "../app/controllers/UserController";
const Router = require('koa-router');

const userController = new UserController();
const router = new Router();

router.post('/users', userController.create);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.patch('/users/:id', userController.update);

export default router;