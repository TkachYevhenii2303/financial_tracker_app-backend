import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

@Entity("balance")
export class BalanceEntity extends DateBaseEntity {
  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.balances)
  currency: CurrencyEntity;

  @OneToOne(() => UserEntity, (user) => user.balance)
  user: UserEntity;
}
