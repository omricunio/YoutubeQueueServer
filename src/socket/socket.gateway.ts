import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class SocketGateway implements OnGatewayInit ,OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  
  sendMessage(roomId: string, senderId: string, eventId: string, message: any) {
    //this.server.in(roomId).emit(eventId, message);
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
    //const Authorization = client.handshake.query['Authorization'];
    //client.id = Authorization;
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
