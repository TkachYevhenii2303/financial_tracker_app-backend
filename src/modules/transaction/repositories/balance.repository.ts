import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BalanceEntity } from "../entities/balance.entity";

@Injectable()
export class BalanceRepository extends Repository<BalanceEntity> {

    async getBalanceByUserId(userId: string): Promise<BalanceEntity> {
        const balance = await this.findOne({ where: { userId } });
        if (!balance) {
            throw new Error("Balance not found");
        }
        return balance;
    }   
}
