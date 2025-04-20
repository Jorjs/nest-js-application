import { Socket } from 'socket.io';
import { WSGuard } from './guards/ws.guard';

export type SocketIOMiddleware = {
    (client: Socket, next: (err?: Error) => void);
}

export const SocketAuthMiddleware = () : SocketIOMiddleware => {
    return (client, next) =>  {
        try {
            WSGuard.validateToken(client)
            next();
        }
        catch(error) {
            next(error)
        }
    }
     
}