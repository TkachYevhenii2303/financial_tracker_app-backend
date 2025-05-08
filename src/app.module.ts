import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { databaseConfig } from './database/database.config';
import { CurrencyModule } from './modules/currency/modules/currency.module';
import { TransactionModule } from './modules/transaction/modules/transaction.module';
import { GoalModule } from './modules/goal/modules/goal.module';
import { AuthModule } from './modules/auth/modules/auth.module';
import { CategoryModule } from './modules/category/modules/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        CurrencyModule,
        TransactionModule,
        AuthModule,
        CategoryModule,
        GoalModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

