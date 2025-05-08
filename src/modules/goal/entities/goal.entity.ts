import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { GoalStatus } from "../dtos/goal-status";

@Entity("goal")
export class GoalEntity extends DateBaseEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({
    type: "enum",
    enum: GoalStatus,
    default: GoalStatus.ACTIVE,
  })
  status: GoalStatus;

  @Column({ type: "uuid", nullable: false, name: "user_id" })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.goals)
  @JoinColumn({ name: "currency_id" })
  currency: CurrencyEntity;

  @Column({ type: "uuid", nullable: false, name: "currency_id" })
  currencyId: string;
}
