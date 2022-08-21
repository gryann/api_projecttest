import { getRepository, Repository } from "typeorm";
import User from "../models/User";

class UserRepository {

    private db: Repository<User>;

    constructor() {
        this.db = getRepository(User);
    }

    public async create(user: User): Promise<User> {
        const data = this.db.create(user);
        await this.db.save(data);
        return data;
    }

}

export default UserRepository