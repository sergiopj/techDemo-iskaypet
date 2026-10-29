import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { Auth0JwtAuthGuard } from "./guards/auth0-jwt-auth.guard";
import { Auth0JwtStrategy } from "./strategies/auth0-jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: "auth0-jwt" }),
  ],
  providers: [
    Auth0JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: Auth0JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
