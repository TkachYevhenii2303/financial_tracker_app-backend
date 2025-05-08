import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Period } from "src/common/enums/period.enum";

export class CategoryRequestDto {
    @ApiProperty({
        description: 'The name of the category',
        example: 'Food',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The description of the category',
        example: 'This is a description of the category',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The color of the category',
        example: '#000000',
    })
    @IsString()
    color: string;

    @ApiProperty({
        description: 'The icon of the category',
        example: '🍕',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        description: 'The type of the category',
        example: 'income | expense',
    })
    @IsString()
    type: string;

    @ApiProperty({
        description: 'The limit of the category',
        example: 1000,
    })
    @IsNumber()
    limit: number;

    @ApiProperty({
        description: 'The period of the category',
        example: Period.MONTH,
    })
    @IsEnum(Period)
    period: Period;

    @ApiProperty({
        description: 'The currency id of the category',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsString()
    currencyId: string;
}
