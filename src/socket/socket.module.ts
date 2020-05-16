import { Module } from '@nestjs/common';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  providers: [SocketGateway​​],
  exports: [SocketGateway]
})

export class SocketModule {}
