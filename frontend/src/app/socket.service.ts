import { Injectable } from '@angular/core';
//import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
//import { io } from "socket.io-client";
//import * as io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';


@Injectable()
export class SocketService {

  public position$: BehaviorSubject<any> = new BehaviorSubject('');

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3002');
  }



  public getPosition = () => {
    this.socket.on('position', (message) => {
      console.log('log position ', message);
      this.position$.next(message);
    });
    return this.position$.asObservable();
  };

}

export interface Position {
  id: string,
  lat: string,
  lon: string,
  heading: string
}