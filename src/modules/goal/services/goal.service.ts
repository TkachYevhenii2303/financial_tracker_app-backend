import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repositories/goal.repository";
import { GoalEntity } from "../entities/goal.entity";
import { GoalRequestDto } from "../dtos/goal-request.dto";
import { GoalResponseDto } from "../dtos/goal-response.dto";

@Injectable()
export class GoalService {
  constructor(private readonly goalRepository: GoalRepository) {}

  async createGoal(goalDto: GoalRequestDto): Promise<GoalResponseDto> {
    const goal = new GoalEntity();
    Object.assign(goal, goalDto);

    const savedGoal = await this.goalRepository.save(goal);
    return GoalResponseDto.fromEntity(savedGoal);
  }

  async getGoalById(id: string): Promise<GoalResponseDto> {
    const goal = await this.goalRepository.getGoalById(id);
    return GoalResponseDto.fromEntity(goal);
  }

  async updateGoal(id: string, goalDto: GoalRequestDto): Promise<void> {
    const goal = await this.goalRepository.getGoalById(id);
    Object.assign(goal, goalDto);

    const updatedGoal = await this.goalRepository.update(id, goal);
    if (!updatedGoal) {
      throw new NotFoundException("Goal not found");
    }
  }

  async getGoalsByUserId(userId: string): Promise<GoalResponseDto[]> {
    const goals = await this.goalRepository.getGoalsByUserId(userId);
    return goals.map((goal) => GoalResponseDto.fromEntity(goal));
  }
}
