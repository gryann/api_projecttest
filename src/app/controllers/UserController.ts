import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";


class UserController {
    public async create(ctx) {
        try {
            const userReporsitory = new UserRepository();
            const userExist = await userReporsitory.find({ email: ctx.request.body.email });
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

    public async getAll(ctx) {
        try {
            const userService = new UserService();
            const users = await userService.getAll();
            return (
                ctx.body = users,
                ctx.status = 200
            );
        } catch (err) {
            return (
                ctx.status = 500
            )
        }
    }

    public async getById(ctx) {
        try {
            const userService = new UserService();
            const user = await userService.getById(ctx.params.id);
            if (!user) {
                return (
                    ctx.status = 404,
                    ctx.body = { mensagem: 'User not found!' }
                )
            }
            return (
                ctx.body = user,
                ctx.status = 200
            );
        } catch (err) {
            return (
                ctx.status = 500
            )
        }
    }

    public async update(ctx) {
       try {
            const userReporsitory = new UserRepository();
            const userExist = await userReporsitory.find({ id: ctx.request.params.id });
            if (!userExist.length) {
                return (
                    ctx.status = 404,
                    ctx.body = { mensagem: 'User not found!' }
                )
            }
            
            const userService = new UserService();
            await userService.update(ctx.request.params.id, ctx.request.body);
            return (
                ctx.status = 204
            );
        }
            catch (err) {
            return (
                ctx.status = 500
            )
        }
    }

    public async delete(ctx) {
        try {
             const userService = new UserService();
             await userService.delete(ctx.request.params.id);
             return (
                 ctx.status = 204
             );
         }
             catch (err) {
             return (
                 ctx.status = 500
             )
         }
     }


}

export default UserController;