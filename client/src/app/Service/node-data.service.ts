import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import * as socketIo from 'socket.io-client';

const apiUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {
  private socket;

  constructor() { }

  initSocket(): void {
    this.socket = socketIo(apiUrl);
  }

  treeEmit(): void {
    this.socket.emit('getTree', ' secret message');
  }

  getTree(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('getTree', (data) => {
        observer.next(data.root);
      });
    });
  }

  modifyTree(msg, data): void {
    this.socket.emit(msg, data);
  }
}
