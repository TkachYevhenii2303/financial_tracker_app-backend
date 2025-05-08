import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CurrencyRateEntity } from "./currency-rate.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";
import { CategoryLimitEntity } from "src/modules/category/entities/category-limit.entity";
import { WalletEntity } from "src/modules/transaction/entities/wallet.entity";
import { GoalEntity } from "src/modules/goal/entities/goal.entity";
import { BalanceEntity } from "src/modules/transaction/entities/balance.entity";

@Entity("currency")
export class CurrencyEntity extends DateBaseEntity {
  @Column({ type: "varchar", length: 3 })
  code: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToMany(
    () => CurrencyRateEntity,
    (currencyRate) => currencyRate.currencyFrom
  )
  ratesFrom: CurrencyRateEntity[];

  @OneToMany(
    () => CurrencyRateEntity,
    (currencyRate) => currencyRate.currencyTo
  )
  ratesTo: CurrencyRateEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.currency)
  transactions: TransactionEntity[];

  @OneToMany(() => CategoryLimitEntity, (limit) => limit.currency)
  categoryLimits: CategoryLimitEntity[];

  @OneToMany(() => WalletEntity, (wallet) => wallet.currency)
  wallets: WalletEntity[];

  @OneToMany(() => GoalEntity, (goal) => goal.currency)
  goals: GoalEntity[];

  @OneToMany(() => BalanceEntity, (balance) => balance.currency)
  balances: BalanceEntity[];
}
