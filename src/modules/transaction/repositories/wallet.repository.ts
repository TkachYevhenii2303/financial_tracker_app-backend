import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { WalletEntity } from "../entities/wallet.entity";

@Injectable()
export class WalletRepository extends Repository<WalletEntity> {

    async getWalletByUserId(userId: string): Promise<WalletEntity> {
        const wallet = await this.findOne({ where: { userId } });
        if (!wallet) {
            throw new Error("Wallet not found");
        }
        return wallet;
    }
}