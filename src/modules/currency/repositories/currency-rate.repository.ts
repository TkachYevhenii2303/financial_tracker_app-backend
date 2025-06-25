import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CurrencyRateEntity } from "../entities/currency-rate.entity";
import { CurrencyEntity } from "../entities/currency.entity";

@Injectable()
export class CurrencyRateRepository extends Repository<CurrencyRateEntity> {
  async getRateBetweenTwoCurrencies(currencyCodeFrom: string, currencyCodeTo: string): Promise<CurrencyRateEntity | null> {
    return await this.findOne({
        where: {
          currencyFrom: { code: currencyCodeFrom },
          currencyTo: { code: currencyCodeTo },
        },
        relations: ['currencyFrom', 'currencyTo'],
      });
  }

  async findAll(): Promise<CurrencyRateEntity[]> {
    return await this.find({
      relations: ['currencyFrom', 'currencyTo'],
    });
  }
}

