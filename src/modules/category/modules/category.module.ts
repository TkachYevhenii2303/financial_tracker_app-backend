import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryLimitRepository } from "../repositories/category-limit.repository";
import { CategoryLimitEntity } from "../entities/category-limit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryLimitEntity])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository, CategoryLimitRepository],
})
export class CategoryModule {}