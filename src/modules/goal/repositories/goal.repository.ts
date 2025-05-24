import { Repository } from "typeorm";
import { GoalEntity } from "../entities/goal.entity";
import { NotFoundException } from "@nestjs/common";

export class GoalRepository extends Repository<GoalEntity> {

    async getGoalsByUserId(userId: string): Promise<GoalEntity[]> {
        return this.find({ where: { userId } });
    }

    async getGoalById(id: string): Promise<GoalEntity> {
        const goal = await this.findOne({ where: { id } });
        if (!goal) {
            throw new NotFoundException("Goal not found");
        }
        return goal;
    }
}
