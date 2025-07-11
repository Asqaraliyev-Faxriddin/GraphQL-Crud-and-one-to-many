import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { Prisma } from '@prisma/client';
  import { Response } from 'express';
  
  @Catch(Prisma.PrismaClientKnownRequestError)
  export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Ichki server xatosi';
  
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'Bu qiymat allaqachon mavjud (unique constraint)';
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Maʼlumot topilmadi';
      }
  
      response.status(status).json({
        statusCode: status,
        message,
        prismaCode: exception.code,
      });
    }
  }
  