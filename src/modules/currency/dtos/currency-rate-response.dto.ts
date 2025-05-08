import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { CurrencyRateEntity } from '../entities/currency-rate.entity';

export class CurrencyRateResponseDto {
  @ApiProperty({ example: '73b60656-25ca-4518-93d9-a7bf2c730356' })
  @IsUUID(4, { message: 'Order id must be a valid UUID' })
  id: string;

  @ApiProperty({ example: 'USDT' })
  @IsString({ message: 'Currency from code must be a valid string' })
  currencyCodeFrom: string;

  @ApiProperty({ example: 'BTC' })
  @IsString({ message: 'Currency to code must be a valid string' })
  currencyCodeTo: string;

  @ApiProperty({ example: 'Tether' })
  @IsString({ message: 'Currency from name must be a valid string' })
  currencyNameFrom: string;

  @ApiProperty({ example: 'Bitcoin' })
  @IsString({ message: 'Currency to name must be a valid string' })
  currencyNameTo: string;

  @ApiProperty({ example: 0.00000001 })
  @IsNumber({}, { message: 'Rate must be a valid number' })
  rate: number;

  @ApiProperty({ example: '2025-01-01' })
  @IsDate({ message: 'Updated at must be a valid date' })
  updatedAt: Date;

  constructor(currencyRate: CurrencyRateEntity) {
    this.id = currencyRate.id;
    this.currencyCodeFrom = currencyRate.currencyFrom.code;
    this.currencyCodeTo = currencyRate.currencyTo.code;
    this.currencyNameFrom = currencyRate.currencyFrom.name;
    this.currencyNameTo = currencyRate.currencyTo.name;
    this.rate = currencyRate.rate;
    this.updatedAt = currencyRate.updatedAt;
  }

  static fromEntity(currencyRate: CurrencyRateEntity): CurrencyRateResponseDto {
    return new CurrencyRateResponseDto(currencyRate);
  }
}
