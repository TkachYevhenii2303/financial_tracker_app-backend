import { ApiProperty } from "@nestjs/swagger";
import { Period } from "src/common/enums/period.enum";

export class CategoryLimitResponseDto {
  @ApiProperty({
    description: "The unique identifier of the category limit",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "The spending limit amount",
    example: 1000,
  })
  limit: number;

  @ApiProperty({
    description: "The current amount spent",
    example: 750.5,
  })
  amount: number;

  @ApiProperty({
    description: "The time period for the limit",
    enum: Period,
    example: Period.MONTH,
  })
  period: Period;

  @ApiProperty({
    description: "The currency identifier for this limit",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  currencyId: string;

  @ApiProperty({
    description: "When the limit was created",
    example: "2023-01-01T00:00:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "When the limit was last updated",
    example: "2023-01-02T00:00:00Z",
  })
  updatedAt: Date;
}

export class CategoryResponseDto {
  @ApiProperty({
    description: "The unique identifier of the category",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "The name of the category",
    example: "Groceries",
  })
  name: string;

  @ApiProperty({
    description: "The description of the category",
    example: "Daily food and household items",
  })
  description: string;

  @ApiProperty({
    description: "The type of the category",
    example: "expense",
  })
  type: string;

  @ApiProperty({
    description: "The user ID who owns this category",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  userId: string;

  @ApiProperty({
    description: "The icon identifier for the category",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  icon: string;

  @ApiProperty({
    description: "The color code for the category",
    example: "#4287f5",
  })
  color: string;

  @ApiProperty({
    description: "The spending limit details for this category",
    type: CategoryLimitResponseDto,
  })
  limit: CategoryLimitResponseDto;

  @ApiProperty({
    description: "When the category was created",
    example: "2023-01-01T00:00:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "When the category was last updated",
    example: "2023-01-02T00:00:00Z",
  })
  updatedAt: Date;
}
