import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CategoryLimitEntity } from "./category-limit.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";

@Entity("category")
export class CategoryEntity extends DateBaseEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", length: 255 })
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ type: "uuid", nullable: false, name: "user_id" })
  userId: string;

  @Column({ type: "uuid" })
  icon: string;

  @Column({ type: "varchar", length: 255 })
  color: string;

  @OneToOne(() => CategoryLimitEntity, (limit) => limit.category)
  limit: CategoryLimitEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.category)
  transactions: TransactionEntity[];
}
