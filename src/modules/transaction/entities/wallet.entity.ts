import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { TransactionEntity } from "./transaction.entity";

@Entity("wallet")
export class WalletEntity extends DateBaseEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.wallets)
  @JoinColumn({ name: "currency_id" })
  currency: CurrencyEntity;

  @Column({ type: "uuid", nullable: false, name: "currency_id" })
  currencyId: string;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ type: "uuid", nullable: false, name: "user_id" })
  userId: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet)
  transactions: TransactionEntity[];
}
