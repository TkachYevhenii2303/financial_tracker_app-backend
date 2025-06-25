import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { GoalStatus } from "./goal-status";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GoalRequestDto {
  @ApiProperty({ description: "Goal name", example: "Buy a house" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Goal amount", example: 10000.0 })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: "Start date", example: "2023-01-01" })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @ApiPropertyOptional({ description: "End date", example: "2023-12-31" })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    description: "Goal status",
    enum: GoalStatus,
    default: GoalStatus.ACTIVE,
  })
  @IsEnum(GoalStatus)
  @IsOptional()
  status?: GoalStatus;

  @ApiProperty({ description: "Currency ID" })
  @IsUUID()
  @IsNotEmpty()
  currencyId: string;

  @ApiProperty({ description: "User ID" })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
