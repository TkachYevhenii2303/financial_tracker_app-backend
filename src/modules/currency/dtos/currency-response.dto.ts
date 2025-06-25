import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { CurrencyEntity } from '../entities/currency.entity';

export class CurrencyResponseDto {
  @ApiProperty({ example: '73b60656-25ca-4518-93d9-a7bf2c730356' })
  @IsUUID(4, { message: 'Order id must be a valid UUID' })
  id: string;

  @ApiProperty({ example: 'USDT' })
  @IsString({ message: 'Currency from code must be a valid string' })
  currencyCode: string;

  @ApiProperty({ example: 'Tether' })
  @IsString({ message: 'Currency from name must be a valid string' })
  currencyName: string;

  constructor(currency: CurrencyEntity) {
    this.id = currency.id;
    this.currencyCode = currency.code;
    this.currencyName = currency.name;
  }

  static fromEntity(currency: CurrencyEntity): CurrencyResponseDto {
    return new CurrencyResponseDto(currency);
  }
}
