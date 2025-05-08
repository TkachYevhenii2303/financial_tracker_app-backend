import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryRequestDto } from "../dtos/category-request.dto";
import { CategoryLimitEntity } from "../entities/category-limit.entity";
import { CategoryLimitRepository } from "../repositories/category-limit.repository";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository(CategoryLimitEntity)
    private readonly categoryLimitRepository: CategoryLimitRepository
  ) {}

  async createCategoryByUserId(userId: string, category: CategoryRequestDto) {
    const { limit, period, ...categoryData } = category;

    const savedCategory = await this.categoryRepository.save({
      ...categoryData,
      userId,
    });

    await this.categoryLimitRepository.save({
      categoryId: savedCategory.id,
      limit,
      period,
    });

    return savedCategory;
  }

  async getCategoriesByUserId(userId: string) {
    return await this.categoryRepository.find({ where: { userId } });
  }

  async updateCategoryById(id: string, category: CategoryRequestDto) {
    return await this.categoryRepository.update(id, {});
  }

  async deleteCategoryById(id: string) {
    return await this.categoryRepository.delete(id);
  }

  async getCategoryById(id: string) {
    return await this.categoryRepository.findOne({ where: { id } });
  }
}
