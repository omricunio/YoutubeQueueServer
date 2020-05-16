import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class SocketGateway implements OnGatewayInit ,OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  
  sendMessage(roomId: string, senderId: string, eventId: string, message: any) {
    for(const [socketId, socket] of Object.entries(this.server.in(roomId).sockets)) {
      if(socketId !== senderId) {
        socket.emit(eventId, message)
      }
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    const queueGuid = client.handshake.query['queueGuid'];
    if(queueGuid !== "undefined") {
      client.join(queueGuid);
      client.emit("connected", client.id);
      console.log(`Client connected: id: ${client.id} queueGuid: ${queueGuid}`);
    }
    else {
      client.emit("connection_error", "queue guid sent to server is undefined");
    }
  }

  afterInit(server: any) {
    console.log("init");
  }
}
