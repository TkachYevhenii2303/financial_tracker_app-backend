import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    async findById(id: string): Promise<UserEntity> {
        const user = await this.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }
}
