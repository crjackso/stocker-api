import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthController {
  @Get()
  async portfolio() {
    return {
      success: true,
      status: 'Stocker API is healthy'
    }
  }
}
