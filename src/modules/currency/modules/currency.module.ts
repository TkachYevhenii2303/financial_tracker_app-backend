import { Module } from "@nestjs/common";
import { CurrencyController } from "../controllers/currency.controller";
import { CurrencyService } from "../services/currency.service";
import { CurrencyRepository } from "../repositories/currency.repository";
import { CurrencyRateRepository } from "../repositories/currency-rate.repository";

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository, CurrencyRateRepository],
})
export class CurrencyModule {}
