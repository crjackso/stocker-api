import { Jsonable } from '@app/types/jsonable'

export class BaseError extends Error {
  public readonly context?: Jsonable
  public readonly cause?: Error

  constructor(message: string, options: { cause?: Error; context?: Jsonable } = {}) {
    const { cause, context } = options

    super(message)

    this.cause = cause
    this.name = this.constructor.name
    this.context = context
  }

  public toJSON(): Jsonable {
    return `${this.message} || ${JSON.stringify(this.cause.message)}`
  }
}
