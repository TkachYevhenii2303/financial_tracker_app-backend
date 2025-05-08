import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GoalService } from "../services/goal.service";

@ApiTags("Goal")
@Controller("goal")
export class GoalController {
  constructor(private readonly goalService: GoalService) {}
}
