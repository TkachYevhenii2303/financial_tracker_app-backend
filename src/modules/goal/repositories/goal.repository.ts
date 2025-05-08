import { Repository } from "typeorm";
import { GoalEntity } from "../entities/goal.entity";

export class GoalRepository extends Repository<GoalEntity> {}
