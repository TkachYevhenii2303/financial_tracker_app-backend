import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CurrencyEntity } from "./currency.entity";

@Entity('currency_rate')
export class CurrencyRateEntity extends DateBaseEntity {
    @ManyToOne(() => CurrencyEntity, (currency) => currency.id)
    @JoinColumn({ name: 'currency_from_id' })
    currencyFrom: CurrencyEntity;

    @ManyToOne(() => CurrencyEntity, (currency) => currency.id)
    @JoinColumn({ name: 'currency_to_id' })
    currencyTo: CurrencyEntity;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    rate: number;
}