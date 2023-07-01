import { Test, TestingModule } from '@nestjs/testing';
import { MarketStackService } from './market-stack.service';

describe('MarketStackService', () => {
  let service: MarketStackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketStackService],
    }).compile();

    service = module.get<MarketStackService>(MarketStackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
