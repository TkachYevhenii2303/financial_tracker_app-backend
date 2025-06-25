import { Controller, Get, HttpStatus } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrencyService } from "../services/currency.service";
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CurrencyRateResponseDto } from "../dtos/currency-rate-response.dto";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";

@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Cron(CronExpression.EVERY_HOUR)
  @ApiOperation({
    summary: 'Fetch rate between two currencies',
    description: 'CRON JOB',
  })
  async fetchCurrencyRates() {
    await this.currencyService.fetchCurrencyRates();
  }

  @Get('rates')
  @ApiOperation({
    summary: 'Get all currency rates',
    description: 'TEST',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CurrencyRateResponseDto,
    example: {
      data: [
        {
          id: '7df83178-c0b6-4d16-9368-40590312ec6a',
          currencyFrom: {
            name: 'Tether',
            code: 'USDT',
          },
          currencyTo: {
            name: 'Bitcoin',
            code: 'BTC',
          },
          rate: 1.11,
        },
      ],
      statusCode: HttpStatus.OK,
    },
  })
  async getCurrencyRates() {
    const currencyRates = await this.currencyService.getCurrencyRates();
    return {
      data: currencyRates,
      statusCode: HttpStatus.OK,
    };
  }

  @Get()
  //#region Get all currencies api response config
  @ApiOperation({
    summary: 'Get all currencies',
    description: 'All currencies from currency_setting table',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CurrencyResponseDto,
    example: [
      {
        id: '7df83178-c0b6-4d16-9368-40590312ec6a',
        name: 'Tether',
        symbol: 'Tether Symbol',
        code: 'USDT',
      },
      {
        id: '7df83178-c0b6-4d16-9368-40590312ec6a',
        name: 'Bitcoin',
        symbol: 'Bitcoin Symbol',
        code: 'BTC',
      },
    ],
  })
  //#endregion
  getAvailableCurrencies() {
    return this.currencyService.getAvailableCurrencies();
  }
}
