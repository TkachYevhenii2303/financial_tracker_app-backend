import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { DateBaseEntity } from "src/common/entities/date-base.entity";

@Entity("refresh_token")
export class RefreshTokenEntity extends DateBaseEntity {
  @Column({ type: "varchar", length: 255 })
  token: string;

  @Column({ type: "uuid", nullable: false, name: "user_id" })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.refreshToken)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
