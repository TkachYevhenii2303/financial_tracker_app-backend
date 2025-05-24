import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { WalletEntity } from "./wallet.entity";

@Entity("transaction")
export class TransactionEntity extends DateBaseEntity {
  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.transactions)
  @JoinColumn({ name: "currency_id" })
  currency: CurrencyEntity;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.transactions)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @Column({ type: "uuid", nullable: true, name: "category_id" })
  categoryId: string;

  @Column({ type: "uuid", nullable: false, name: "currency_id" })
  currencyId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  type: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions)
  @JoinColumn({ name: "wallet_id" })
  wallet: WalletEntity;

  @Column({ type: "uuid", nullable: false, name: "wallet_id" })
  walletId: string;
}
