import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import jwksRsa from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthenticatedUser } from "../authenticated-user";

@Injectable()
export class Auth0JwtStrategy extends PassportStrategy(Strategy, "auth0-jwt") {
  constructor(config: ConfigService) {
    const issuer = config.getOrThrow<string>("AUTH0_ISSUER_URL");
    const audience = config.getOrThrow<string>("AUTH0_AUDIENCE");
    const jwksUri = `${issuer.replace(/\/+$/, "")}/.well-known/jwks.json`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer,
      audience,
      algorithms: ["RS256"],
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),
    });
  }

  validate(payload: unknown): AuthenticatedUser {
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("sub" in payload) ||
      typeof payload.sub !== "string" ||
      !("iss" in payload) ||
      typeof payload.iss !== "string"
    ) {
      throw new UnauthorizedException("Invalid access token");
    }

    const scopes =
      "scope" in payload && typeof payload.scope === "string"
        ? payload.scope.split(/\s+/).filter(Boolean)
        : [];

    return {
      subject: payload.sub,
      issuer: payload.iss,
      scopes,
    };
  }
}
