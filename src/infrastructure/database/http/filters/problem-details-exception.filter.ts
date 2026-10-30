import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors?: unknown;
  traceId: string;
  timestamp: string;
}

@Catch()
export class ProblemDetailsExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsExceptionFilter.name);

  private static readonly TITLES: Record<number, string> = {
    [HttpStatus.BAD_REQUEST]: "Bad Request",
    [HttpStatus.UNAUTHORIZED]: "Unauthorized",
    [HttpStatus.FORBIDDEN]: "Forbidden",
    [HttpStatus.NOT_FOUND]: "Not Found",
    [HttpStatus.CONFLICT]: "Conflict",
    [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  };

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const isHttpException = exception instanceof HttpException;
    const traceId = (request.headers["x-request-id"] as string) || randomUUID();
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const type = `https://api.animal-clinic/errors/${status}`;

    const { detail, errors } = this.setDetail(exception, status, traceId);

    const problem: ProblemDetails = {
      title: this.getTitleForStatus(status),
      type,
      status,
      detail,
      instance: request.url,
      traceId,
      timestamp: new Date().toISOString(),
      ...(errors ? { errors } : {}),
    };

    response
      .status(status)
      .setHeader("X-Request-Id", traceId)
      .contentType("application/problem+json")
      .json(problem);
  }

  private setDetail(
    exception: unknown,
    status: number,
    traceId: string,
  ): { detail: string; errors?: unknown } {
    let detail = "An unexpected error occurred.";
    let errors: unknown = undefined;

    if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      if (typeof res === "string") {
        detail = res;
      } else if (Array.isArray(res?.message)) {
        detail = "Input validation failed";
        errors = res.message;
      } else {
        detail = res?.message || exception.message;
      }
    } else if (exception instanceof Error) {
      // only logging
      this.logger.error(`[${traceId}] ${exception.message}`, exception.stack);
      detail = exception.message;
    }

    // Prevent sensitive information leakage on server errors (>= 500)
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      detail = "An unexpected error occurred.";
    }

    return { detail, errors };
  }

  private getTitleForStatus(status: number): string {
    return ProblemDetailsExceptionFilter.TITLES[status] ?? "Error";
  }
}
