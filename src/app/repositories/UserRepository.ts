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

    public async getByParams(params: Record<string, any>): Promise<User[]> {
        const data = await this.db.find(params);

        return data;
    }

}

export default UserRepository