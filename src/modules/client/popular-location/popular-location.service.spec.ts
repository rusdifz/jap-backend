import { Test, TestingModule } from '@nestjs/testing';
import { PopularLocationService } from './popular-location.service';

describe('PopularLocationService', () => {
  let service: PopularLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularLocationService],
    }).compile();

    service = module.get<PopularLocationService>(PopularLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
