import User from "../models/User";
import UserRepository from "../repositories/UserRepository";

class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(user: User) {
        try {
            user.createdAt = new Date;
            return await this.userRepository.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAll() {
        return await this.userRepository.find({});
    }

    public async getById(userId: string) {
        return await this.userRepository.findById(userId);
    }

    public async update(id: string, user: User) {
        return await this.userRepository.update(id, user);
    }

    public async delete(id: string) {
        return await this.userRepository.delete(id);
    }

}

export default UserService;