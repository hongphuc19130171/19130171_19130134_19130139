import {Injectable} from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {map, Subject} from "rxjs";
import {Command} from "../model/command";

const CHAT_URL = 'ws://140.238.54.136:8080/chat/chat';

@Injectable()
export class AdapterService {
  public sbj!: Subject<Command>;

  constructor(ws: WebsocketService) {
    this.sbj = <Subject<Command>>(ws.connect(CHAT_URL).pipe(map((response: MessageEvent): Command => {
      return JSON.parse(response.data);
    })));
  }
}
