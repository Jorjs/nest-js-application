import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from 'src/auth/auth.mw';
import { WSGuard } from 'src/auth/guards/ws.guard';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  @UseGuards(WSGuard)
  export class EventGateway {
    @WebSocketServer()
    server: Server;

    afterInit(client: Socket) {
      client.use(SocketAuthMiddleware() as any)
    }

    sendMessage(event: string, message: any) {
      this.server.emit(event, message)
    }
  }