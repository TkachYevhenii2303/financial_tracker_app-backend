import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoalEntity } from "../entities/goal.entity";
import { GoalController } from "../controllers/goal.controller";
import { GoalService } from "../services/goal.service";
import { GoalRepository } from "../repositories/goal.repository";

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  controllers: [GoalController],
  providers: [GoalService, GoalRepository],
})
export class GoalModule {}
