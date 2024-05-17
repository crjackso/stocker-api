import { ApolloServerPlugin, BaseContext, GraphQLRequestContext, GraphQLRequestListener } from '@apollo/server'
import { Plugin } from '@nestjs/apollo'
import { Logger } from '@nestjs/common'

type Operation = {
  request: {
    operationName?: string
  }
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin<BaseContext> {
  private readonly logger: Logger

  constructor() {
    this.logger = new Logger(LoggingPlugin.name)
  }

  async requestDidStart(requestContext: GraphQLRequestContext<BaseContext>): Promise<GraphQLRequestListener<any>> {
    const logger = this.logger
    this.logQuery(requestContext)

    return {
      async didEncounterErrors(requestContext): Promise<void> {
        logger.error(`A Stocker API GraphQL request was unsuccessful: ${JSON.stringify(requestContext.errors)}`)
      }
    }
  }

  private isInspectionQuery(context: Operation): boolean {
    return context.request.operationName === 'IntrospectionQuery'
  }

  private logQuery(requestContext: GraphQLRequestContext<BaseContext>): void {
    if (this.isInspectionQuery(requestContext)) return

    this.logger.log(`request query: ${requestContext.request.query || 'undefined'}`)
  }
}
