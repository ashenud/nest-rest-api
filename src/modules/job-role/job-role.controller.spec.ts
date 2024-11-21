import { Test, TestingModule } from '@nestjs/testing';
import { JobRoleController } from './job-role.controller';
import { JobRoleService } from './job-role.service';

describe('JobRoleController', () => {
  let controller: JobRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobRoleController],
      providers: [JobRoleService],
    }).compile();

    controller = module.get<JobRoleController>(JobRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
