import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { databaseConfig } from './database/database.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

