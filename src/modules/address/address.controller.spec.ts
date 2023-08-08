import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

describe('AddressController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an address', () => {
    expect(controller.create).toBeDefined();
  });

  it('should find all addresses', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('should find one address', () => {
    expect(controller.findOne).toBeDefined();
  });
});
