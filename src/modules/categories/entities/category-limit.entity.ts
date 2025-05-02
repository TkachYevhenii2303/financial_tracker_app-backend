import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DateBaseEntity } from "src/common/entities/date-base.entity";
import { CategoryEntity } from "./category.entity";
import { Period } from "src/common/enums/period.enum";
import { CurrencyEntity } from "src/modules/currency/entities/currency.entity";

@Entity('category_limit')
export class CategoryLimitEntity extends DateBaseEntity {
    @Column({ type: 'uuid' })
    categoryId: string;
    
    @ManyToOne(() => CategoryEntity, (category) => category.id)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    limit: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: Period, default: Period.WEEK })
    period: Period;

    @Column({ type: 'uuid' })
    currencyId: string;

    @ManyToOne(() => CurrencyEntity, (currency) => currency.id)
    @JoinColumn({ name: 'currency_id' })
    currency: CurrencyEntity;
}