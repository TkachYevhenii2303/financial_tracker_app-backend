import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CurrencyRateEntity } from "./currency-rate.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";
import { CategoryLimitEntity } from "src/modules/categories/entities/category-limit.entity";

@Entity("currency")
export class CurrencyEntity extends DateBaseEntity {
  @Column({ type: "varchar", length: 3 })
  currencyCode: string;

  @Column({ type: "varchar", length: 255 })
  currencyName: string;

  @OneToMany(
    () => CurrencyRateEntity,
    (currencyRate) => currencyRate.currencyFrom
  )
  currencyRates: CurrencyRateEntity[];

  @OneToMany(
    () => CurrencyRateEntity,
    (currencyRate) => currencyRate.currencyTo
  )
  currencyRatesTo: CurrencyRateEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.currency)
  transactions: TransactionEntity[];

  @OneToMany(() => CategoryLimitEntity, (limit) => limit.currency)
  categoryLimits: CategoryLimitEntity[];
}
