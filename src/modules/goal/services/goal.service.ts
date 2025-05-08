import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repositories/goal.repository";

@Injectable()
export class GoalService {
  constructor(private readonly goalRepository: GoalRepository) {}

}
