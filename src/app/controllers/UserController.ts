import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";


class UserController {
    public async create(ctx) {
        try {
            const userReporsitory = new UserRepository();
            const userExist = await userReporsitory.getByParams({ email: ctx.request.body.email });
            if (userExist.length) {
                return (
                    ctx.status = 400,
                    ctx.body = { mensagem: 'Email already exists!' }
                )
            }
            
            const userService = new UserService();
            const user = await userService.create(ctx.request.body);
            return (
                ctx.body = user,
                ctx.status = 201
            );
        } catch (err) {
            return (
                ctx.status = 500
            )
        }
    }

}

export default UserController;