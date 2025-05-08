import { Injectable, NotFoundException } from "@nestjs/common";
import { TransactionEntity } from "../entities/transaction.entity";
import { TransactionRepository } from "../repositories/transaction.repository";

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(
    transaction: TransactionEntity
  ): Promise<TransactionEntity> {
    return await this.transactionRepository.save(transaction);
  }

  async getTransactions(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }

  async getTransactionById(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }
    return transaction;
  }

  async updateTransaction(
    id: string,
    transaction: TransactionEntity
  ): Promise<void> {
    const updatedTransaction = await this.transactionRepository.update(
      id,
      transaction
    );
    if (!updatedTransaction) {
      throw new NotFoundException("Transaction not found");
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
