import { Module } from '@nestjs/common';
import { QueuesModule } from './queues/queues.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [QueuesModule, UsersModule]
})

export class AppModule {}
