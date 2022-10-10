import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "~/src/environments/environment";

export const IoConfig: SocketIoConfig = {
  url: environment.socket,
  options: {
    reconnection: true,
    reconnectionAttempts: 3,
    closeOnBeforeunload: true
  }
}
