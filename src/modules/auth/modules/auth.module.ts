import { Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { RefreshTokenRepository } from "../repositories/refresh-token.repository";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { JwtTokenService } from "../services/jwt-token.service";

@Module({
  imports: [],
  controllers: [AuthController, UserController],
  providers: [AuthService, RefreshTokenRepository, UserRepository, JwtService, UserService, JwtTokenService],
})
export class AuthModule {}
