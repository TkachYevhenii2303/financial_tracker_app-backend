import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CategoryEntity } from "src/modules/categories/entities/category.entity";

@Entity("transaction")
export class TransactionEntity extends DateBaseEntity {
  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.transactions)
  @JoinColumn({ name: "currency_code_id" })
  currency: CurrencyEntity;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.transactions)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @Column({ type: "uuid", nullable: true, name: "category_id" })
  categoryId: string;

  @Column({ type: "uuid", nullable: false, name: "user_id" })
  userId: string;

  @Column({ type: "uuid", nullable: false, name: "currency_code_id" })
  currencyCodeId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  type: string;
}
