
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  constructor() {
  }

  private subject!: Rx.Subject<MessageEvent>;

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected To: ' + url);
    }
    return this.subject;
  }

  private create(url: string): Rx.Subject<MessageEvent> {
    let wsc = new WebSocket(url);
    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      wsc.onmessage = obs.next.bind(obs);
      wsc.onerror = obs.error.bind(obs);
      wsc.onclose = obs.complete.bind(obs);
      return wsc.close.bind(wsc);
    });
    let observer = {
      next: (data: Object) => {
        if (wsc.readyState === WebSocket.OPEN) {
          wsc.send(JSON.stringify(data));
        }
      },
    };
    return Rx.Subject.create(observer, observable);
  }
}

