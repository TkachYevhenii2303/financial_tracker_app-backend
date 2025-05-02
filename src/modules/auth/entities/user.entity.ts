import { Entity, Column, OneToOne, OneToMany } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { RefreshTokenEntity } from "./refresh-token.entity";
import { CategoryEntity } from "src/modules/categories/entities/category.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";

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
}
