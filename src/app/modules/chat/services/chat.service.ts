import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(private readonly socket: Socket) {
    this.socket.on('connect', () => {

    });

    this.socket.on('disconnect', () => {
    });
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent('message').pipe(map(message => message as string));
  }
}
