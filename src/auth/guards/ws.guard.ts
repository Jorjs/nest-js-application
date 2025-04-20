import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Observable } from "rxjs";
import { Socket } from 'socket.io';

@Injectable()
export class WSGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if(context.getType() !== 'ws') {
            return true;
        }

        const client: Socket = context.switchToWs().getClient()
        WSGuard.validateToken(client)

        return true;
    }

    static validateToken(client: Socket) {
        const {authorization} = client.handshake.headers;

        if(!authorization) {
            throw new UnauthorizedException('Authorization header missing');
        }

        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.JWT_TOKEN as string)

        return payload;
    }
}