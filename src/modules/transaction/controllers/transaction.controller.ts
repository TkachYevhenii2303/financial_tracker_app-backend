import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { WalletService } from "../services/wallet.service";
import { TransactionEntity } from "../entities/transaction.entity";
import { TransactionService } from "../services/transaction.service";
@ApiTags('Transactions')
@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService, private readonly walletService: WalletService) {}

    @Post()
    async createTransaction(@Body() transaction: TransactionEntity) {
        const createdTransaction = await this.transactionService.createTransaction(transaction);
        return {
            data: createdTransaction,
            statusCode: 201,
        };
    }

    @Get()
    async getTransactions() {
        const transactions = await this.transactionService.getTransactions();
        return {
            data: transactions,
            statusCode: 200,
        };
    }

    @Get(":id")
    async getTransactionById(@Param("id") id: string) {
        const transaction = await this.transactionService.getTransactionById(id);
        return {
            data: transaction,
            statusCode: 200,
        };
    }

    @Put(":id")
    async updateTransaction(@Param("id") id: string, @Body() transaction: TransactionEntity) {
        await this.transactionService.updateTransaction(id, transaction);
        return {
            message: "Transaction updated successfully",
            statusCode: 200,
        };
    }

    @Delete(":id")
    async deleteTransaction(@Param("id") id: string) {
        await this.transactionService.deleteTransaction(id);
        return {
            message: "Transaction deleted successfully",
            statusCode: 200,
        };
    }

    @Get('balance/:userId')
    async getBalanceByUserId(@Param('userId') userId: string){
        const balance = await this.walletService.getBalanceByUserId(userId);
        return {
            data: balance,
            statusCode: 200,
        };  
    }

    @Get('wallet/:userId')
    async getWalletByUserId(@Param('userId') userId: string){
        const wallet = await this.walletService.getWalletByUserId(userId);
        return {
            data: wallet,
            statusCode: 200,
        };
    }
}
