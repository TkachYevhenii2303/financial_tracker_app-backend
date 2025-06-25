import { BadRequestException, Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repositories/currency.repository";
import { CurrencyRateRepository } from "../repositories/currency-rate.repository";
import { CurrencyEntity } from "../entities/currency.entity";
import axios from "axios";
import { CurrencyRateResponseDto } from "../dtos/currency-rate-response.dto";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";

@Injectable()
export class CurrencyService {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly currencyRateRepository: CurrencyRateRepository
  ) {}

  async getAvailableCurrencies(): Promise<CurrencyResponseDto[]> {
    const currencies = await this.currencyRepository.getAvailableCurrencies();
    return currencies.map((currency) =>
      CurrencyResponseDto.fromEntity(currency)
    );
  }

  async fetchCurrencyRates() {
    const currencies = await this.currencyRepository.getAvailableCurrencies();
    try {
      for (const currency of currencies) {
        if (currency.code === "USDT") {
          continue;
        }
        await this.updateRateBetweenTwoCurrenciesToCurrentRate(
          currency.code,
          "USDT"
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      console.log("Currency rates fetched successfully");
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch currency rates: ${error.message}`
      );
    }
  }

  async updateRateBetweenTwoCurrenciesToCurrentRate(
    currencyFromCode: string,
    currencyToCode: string
  ) {
    const { currencyFrom, currencyTo, currentRate } =
      await this.fetchRateBetweenTwoCurrenciesFromExternalSource(
        currencyFromCode,
        currencyToCode
      );

    const existingRate =
      await this.currencyRateRepository.getRateBetweenTwoCurrencies(
        currencyFrom.code,
        currencyTo.code
      );

    try {
      if (!existingRate) {
        await this.currencyRateRepository.create({
          currencyFrom: currencyFrom,
          currencyTo: currencyTo,
          rate: currentRate,
        });
      } else {
        await this.currencyRateRepository.update(existingRate.id, {
          rate: currentRate,
        });
      }
    } catch (error) {
      throw new BadRequestException(
        `Failed to save currency rate to database: ${error.message}`
      );
    }
  }

  private async fetchRateBetweenTwoCurrenciesFromExternalSource(
    currencyCodeFrom: string,
    currencyCodeTo: string
  ): Promise<{
    currencyFrom: CurrencyEntity;
    currencyTo: CurrencyEntity;
    currentRate: number;
  }> {
    let rateBetweenCurrenciesFromCryptoCompare = 0;
    try {
      const rateResponse = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${currencyCodeFrom}&tsyms=${currencyCodeTo}&tryConversion=false`
      );

      if (!rateResponse.data) {
        throw new BadRequestException(
          "Invalid response from currency rate API."
        );
      }

      rateBetweenCurrenciesFromCryptoCompare =
        rateResponse.data[currencyCodeTo];
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch currency rate from external API: ${error.message}`
      );
    }

    const [currencyFromObject, currencyToObject] = await Promise.all([
      this.currencyRepository.getCurrencyByCode(currencyCodeFrom),
      this.currencyRepository.getCurrencyByCode(currencyCodeTo),
    ]);

    if (!currencyFromObject || !currencyToObject) {
      throw new BadRequestException(
        `One or both currencies not found: ${currencyCodeFrom}, ${currencyCodeTo}`
      );
    }

    return {
      currencyFrom: currencyFromObject,
      currencyTo: currencyToObject,
      currentRate: parseFloat(
        rateBetweenCurrenciesFromCryptoCompare.toFixed(2)
      ),
    };
  }

  async getCurrencyRates() {
    const currencyRates = await this.currencyRateRepository.findAll();

    return currencyRates.map((currencyRate) =>
      CurrencyRateResponseDto.fromEntity(currencyRate)
    );
  }
}
