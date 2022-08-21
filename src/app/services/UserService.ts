import User from "../models/User";
import UserRepository from "../repositories/UserRepository";

class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(user: User) {
        try {
            user.date_birth = new Date(user.date_birth.toString().replace(/-/g, '\/').replace(/T.+/, ''));
            return await this.userRepository.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserService;