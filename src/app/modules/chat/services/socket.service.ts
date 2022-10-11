import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private room: string = '';

  constructor(private readonly socket: Socket) {
    socket.on('disconnect', () => {
      this.leave();
    })
  }

  join(room: string) {
    this.leave();
    this.socket.emit('join', { room });
    this.room = room;
  }

  leave() {
    if(this.room.length) {
      this.socket.emit('leave', {
        room: this.room
      });
      this.room = '';
    }
  }

  sendMessage(message: string) {
    this.socket.emit('message', {
      message,
      room: this.room
    });
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent('message').pipe(map(message => message as string));
  }
}
