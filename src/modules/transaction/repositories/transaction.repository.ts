import { Repository } from "typeorm";
import { TransactionEntity } from "../entities/transaction.entity";

export class TransactionRepository extends Repository<TransactionEntity> {
    
}
