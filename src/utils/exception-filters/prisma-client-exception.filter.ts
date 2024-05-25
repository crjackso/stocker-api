import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { COLOR_RED, COLOR_RESET } from '../colors'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name)

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')
    const requestBody = JSON.stringify(request.body)

    this.logger.log(`${COLOR_RED}[ERROR]${COLOR_RESET} ${request.url} ${requestBody} "${message}"`)

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT
        const resourceClass = exception.meta?.modelName ?? 'entity'

        response.status(status).json({
          statusCode: status,
          message: `The ${resourceClass} already exists in the system`
        })

        break
      }

      case 'P2003': {
        const status = HttpStatus.UNPROCESSABLE_ENTITY

        response.status(status).json({
          statusCode: status,
          message: message
        })

        break
      }

      default:
        super.catch(exception, host)
        break
    }
  }
}
