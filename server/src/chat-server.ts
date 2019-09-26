import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model';

export class ChatServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });

    this.io.on('connection', (socket: any) => {
      console.log(`[server] Connected client on port ${this.port}`);

      socket.on('join', (data: any) => {
        socket.join(data.room);
        console.log(`[server] ${data.user} joined the room ${data.room}`);
        socket.broadcast.to(data.room).emit('new-user-joined', { user: data.user, message: 'has joined this room.' });
      });

      socket.on('message', (data: any) => {
        console.log(`[server] message from ${data.user} to room ${data.room} => ${data.message}`);
        this.io.in(data.room).emit('new-message', { user: data.user, message: data.message });
      });

      socket.on('leave', (data: any) => {
        console.log(`[server] ${data.user} left the room ${data.room}`);
        socket.broadcast.to(data.room).emit('left-room', { user: data.user, message: 'has left this room.' });
        socket.leave(data.room);
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
