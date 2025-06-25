import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CurrencyEntity } from "../entities/currency.entity";

@Injectable()
export class CurrencyRepository extends Repository<CurrencyEntity> {
  async getAvailableCurrencies(): Promise<CurrencyEntity[]> {
    return await this.find();
  }

  async getCurrencyByCode(code: string): Promise<CurrencyEntity | null> {
    return await this.findOne({ where: { code } });
  }
}
