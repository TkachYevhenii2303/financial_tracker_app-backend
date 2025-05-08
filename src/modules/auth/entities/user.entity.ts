import { Entity, Column, OneToOne, OneToMany } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { RefreshTokenEntity } from "./refresh-token.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";
import { GoalEntity } from "src/modules/goal/entities/goal.entity";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";
import { BalanceEntity } from "src/modules/transaction/entities/balance.entity";
import { WalletEntity } from "src/modules/transaction/entities/wallet.entity";

@Entity("user")
export class UserEntity extends DateBaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    default: null,
  })
  username: string | null;

  @OneToOne(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshToken: RefreshTokenEntity;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    name: "password_hash",
  })
  passwordHash: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  budget: number;

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => GoalEntity, (goal) => goal.user)
  goals: GoalEntity[];

  @OneToOne(() => BalanceEntity, (balance) => balance.user)
  balance: BalanceEntity;

  @OneToMany(() => WalletEntity, (wallet) => wallet.user)
  wallets: WalletEntity[];
}
