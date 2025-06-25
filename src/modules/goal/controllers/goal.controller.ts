import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { GoalService } from "../services/goal.service";
import { GoalRequestDto } from "../dtos/goal-request.dto";
import { GoalResponseDto } from "../dtos/goal-response.dto";

@ApiTags("Goal")
@Controller("goal")
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @ApiOperation({ summary: "Create a new goal" })
  @ApiBody({ type: GoalRequestDto })
  @ApiResponse({ status: 201, description: "Goal created successfully" })
  async createGoal(@Body() goalDto: GoalRequestDto) {
    await this.goalService.createGoal(goalDto);
    return {
      message: "Goal created successfully",
      statusCode: 201,
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get goal by ID" })
  @ApiParam({ name: "id", type: String, description: "Goal ID" })
  @ApiResponse({
    status: 200,
    description: "Goal found",
    type: GoalResponseDto,
  })
  async getGoalById(@Param("id") id: string) {
    const goal = await this.goalService.getGoalById(id);
    return {
      data: goal,
      statusCode: 200,
    };
  }

  @Put(":id")
  @ApiOperation({ summary: "Update goal by ID" })
  @ApiParam({ name: "id", type: String, description: "Goal ID" })
  @ApiBody({ type: GoalRequestDto })
  @ApiResponse({ status: 200, description: "Goal updated successfully" })
  async updateGoal(@Param("id") id: string, @Body() goalDto: GoalRequestDto) {
    await this.goalService.updateGoal(id, goalDto);
    return {
      message: "Goal updated successfully",
      statusCode: 200,
    };
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get goals by user ID" })
  @ApiParam({ name: "userId", type: String, description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "Goals found",
    type: [GoalResponseDto],
  })
  async getGoalsByUserId(@Param("userId") userId: string) {
    const goals = await this.goalService.getGoalsByUserId(userId);
    return {
      data: goals,
      statusCode: 200,
    };
  }
}
