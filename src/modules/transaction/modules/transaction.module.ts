import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "../entities/transaction.entity";
import { TransactionController } from "../controllers/transaction.controller";
import { TransactionService } from "../services/transaction.service";
import { TransactionRepository } from "../repositories/transaction.repository";
import { WalletService } from "../services/wallet.service";
import { WalletRepository } from "../repositories/wallet.repository";
import { BalanceRepository } from "../repositories/balance.repository";
import { WalletEntity } from "../entities/wallet.entity";
import { BalanceEntity } from "../entities/balance.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity, WalletEntity, BalanceEntity])],
    controllers: [TransactionController],
    providers: [TransactionService, TransactionRepository, WalletService, WalletRepository, BalanceRepository],
})
export class TransactionModule {}