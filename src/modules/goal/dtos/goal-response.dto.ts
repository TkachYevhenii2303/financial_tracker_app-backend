import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GoalStatus } from "./goal-status";
import { GoalEntity } from "../entities/goal.entity";

export class GoalResponseDto {
  @ApiProperty({ description: "Goal ID" })
  id: string;

  @ApiProperty({ description: "Goal name", example: "Buy a house" })
  name: string;

  @ApiProperty({ description: "Goal amount", example: 10000.0 })
  amount: number;

  @ApiProperty({ description: "Start date", example: "2023-01-01" })
  startDate: Date;

  @ApiPropertyOptional({ description: "End date", example: "2023-12-31" })
  endDate?: Date;

  @ApiProperty({
    description: "Goal status",
    enum: GoalStatus,
    default: GoalStatus.ACTIVE,
  })
  status: GoalStatus;

  @ApiProperty({ description: "Currency ID" })
  currencyId: string;

  @ApiProperty({ description: "User ID" })
  userId: string;

  @ApiProperty({ description: "Created at date" })
  createdAt: Date;

  @ApiProperty({ description: "Updated at date" })
  updatedAt: Date;

  constructor(partial: Partial<GoalResponseDto>) {
    Object.assign(this, partial);
  } 

  static fromEntity(entity: GoalEntity): GoalResponseDto {
    return new GoalResponseDto({
      id: entity.id,
      name: entity.name,
      amount: entity.amount,
      startDate: entity.startDate,
      endDate: entity.endDate,
      status: entity.status,
      currencyId: entity.currencyId,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
