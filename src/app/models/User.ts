import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    date_birth: Date;
    @Column()
    telephone_number: string;
    @Column()
    email: string;

    @Column({name: 'created_at'})
    createdAt: Date;
    @Column({name: 'updated_at'})
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export default User;