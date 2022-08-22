import User from "../models/User";
import UserRepository from "../repositories/UserRepository";
import UserListViewModel from "../viewmodels/UserListViewModel";

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
}

export default UserService;