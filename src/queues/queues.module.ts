import { Module } from '@nestjs/common';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  controllers: [QueuesController],
  providers: [QueuesService],
  imports: [SocketModule]
})

export class QueuesModule {}
