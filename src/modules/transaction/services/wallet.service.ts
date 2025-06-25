import { Injectable } from "@nestjs/common";
import { WalletRepository } from "../repositories/wallet.repository";
import { BalanceRepository } from "../repositories/balance.repository";
import { BalanceEntity } from "../entities/balance.entity";
import { WalletEntity } from "../entities/wallet.entity";

@Injectable()
export class WalletService {
    constructor(private readonly walletRepository: WalletRepository, private readonly balanceRepository: BalanceRepository) {}

    async getBalanceByUserId(userId: string): Promise<BalanceEntity> {
        return this.balanceRepository.getBalanceByUserId(userId);
    }

    async getWalletByUserId(userId: string): Promise<WalletEntity> {
        return this.walletRepository.getWalletByUserId(userId);
    }
}
