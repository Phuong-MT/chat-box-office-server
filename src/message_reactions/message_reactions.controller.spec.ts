import { Test, TestingModule } from '@nestjs/testing';
import { MessageReactionsController } from './message_reactions.controller';
import { MessageReactionsService } from './message_reactions.service';

describe('MessageReactionsController', () => {
  let controller: MessageReactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageReactionsController],
      providers: [MessageReactionsService],
    }).compile();

    controller = module.get<MessageReactionsController>(MessageReactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
