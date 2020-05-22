import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class SocketGateway implements OnGatewayInit ,OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  socketIdToUserId: Record<string, string> = {}
  
  sendMessage(roomId: string, senderId: string, eventId: string, message: any) {
    for(const [socketId] of Object.entries(this.server.sockets.adapter.rooms[roomId].sockets)) {
      if(this.socketIdToUserId[socketId] !== senderId) {
        this.server.sockets.connected[socketId].emit(eventId, message)
      }
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    const queueGuid = client.handshake.query['queueGuid'];
    const userId = client.handshake.query['userId'];

    if(queueGuid !== "undefined") {
      if(userId !== "undefined") {
        client.join(queueGuid);
        this.socketIdToUserId[client.id] = userId;
        console.log(`Client connected: socketId: ${client.id} userId: ${userId} queueGuid: ${queueGuid}`);
        client.emit("connected", client.id);
      }
      else {
        client.emit("connection_error", "user id sent to server is undefined");
      }
    }
    else {
      client.emit("connection_error", "queue guid sent to server is undefined");
    }
  }

  afterInit(server: Server) {
    console.log("init");
  }
}
