import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {

    async findByUserId(userId: string): Promise<RefreshTokenEntity> {
        const refreshToken = await this.findOne({ where: { userId } });

        if (!refreshToken) {
            throw new NotFoundException("Refresh token not found");
        }

        return refreshToken;
    }
}
