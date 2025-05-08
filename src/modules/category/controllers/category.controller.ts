import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryService } from "../services/category.service";
import { CategoryRequestDto } from "../dtos/category-request.dto";
import { CategoryResponseDto } from "../dtos/category-response.dto";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(":userId")
  @ApiOperation({ summary: "Create a new category for a user" })
  @ApiParam({ name: "userId", description: "The ID of the user" })
  @ApiCreatedResponse({
    description: "The category has been successfully created",
    type: CategoryResponseDto,
  })
  async createCategory(
    @Body() category: CategoryRequestDto,
    @Param("userId") userId: string
  ) {
    const createdCategory = await this.categoryService.createCategoryByUserId(
      userId,
      category
    );
    return {
      data: createdCategory,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get(":userId")
  @ApiOperation({ summary: "Get all categories for a user" })
  @ApiParam({ name: "userId", description: "The ID of the user" })
  @ApiOkResponse({
    description: "List of categories retrieved successfully",
    type: [CategoryResponseDto],
  })
  async getCategoriesByUserId(@Param("userId") userId: string) {
    const categories = await this.categoryService.getCategoriesByUserId(userId);
    return {
      data: categories,
      statusCode: HttpStatus.OK,
    };
  }

  @Get("detail/:id")
  @ApiOperation({ summary: "Get a category by ID" })
  @ApiParam({ name: "id", description: "The ID of the category" })
  @ApiOkResponse({
    description: "Category retrieved successfully",
    type: CategoryResponseDto,
  })
  async getCategoryById(@Param("id") id: string) {
    const category = await this.categoryService.getCategoryById(id);
    return {
      data: category,
      statusCode: HttpStatus.OK,
    };
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a category" })
  @ApiParam({ name: "id", description: "The ID of the category to update" })
  @ApiOkResponse({
    description: "Category updated successfully",
    type: CategoryResponseDto,
  })
  async updateCategory(
    @Param("id") id: string,
    @Body() category: CategoryRequestDto
  ) {
    const updatedCategory = await this.categoryService.updateCategoryById(
      id,
      category
    );
    return {
      data: updatedCategory,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a category" })
  @ApiParam({ name: "id", description: "The ID of the category to delete" })
  @ApiNoContentResponse({ description: "Category deleted successfully" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param("id") id: string) {
    await this.categoryService.deleteCategoryById(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
