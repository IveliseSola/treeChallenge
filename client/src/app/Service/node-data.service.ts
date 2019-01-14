import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseType } from '@angular/http/src/enums';

import { Root } from '../Models/Root';
import * as socketIo from 'socket.io-client';
import { JSDocCommentStmt } from '@angular/compiler/src/output/output_ast';
import { NodeFactory } from 'src/app/Models/NodeFactory';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {
  private socket;
  root = new Root();
  nodeFactory = new NodeFactory();

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  initSocket(): void {
    this.socket = socketIo(apiUrl);
  }

  // getRoot(): Observable<any> {
  //   return this.http.get(apiUrl, httpOptions)
  //     .pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }

  // getChild(data): Observable<any> {
  //   return this.http.get(apiUrl + data, httpOptions)
  //     .pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }

  treeEmit(): void {
    this.socket.emit('getTree');
  }

  getTree(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('getTree', (data) => {
        observer.next(data.root);
      });
    });
  }

  // getChild(nodeFactoryId: String, socket): void {
  //   socket.emit('getNode', nodeFactoryId);
  // }

  updateChild(idRoot, idNF, data): Observable<any> {
    return this.http.put(apiUrl, { idRoot, idNF, data }, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }
  // addNode(data): Observable<any> {
  //   return this.http.post(apiUrl, data, httpOptions)
  //     .pipe(
  //     catchError(this.handleError)
  //     );
  // }

  addNode(data): void {
    this.socket.emit('addRoot', data);
  }

  addNodeFactory(obj): void {
    this.socket.emit('addNode', obj);
  }



  updateTree(id, data): Observable<any> {
    return this.http.post(apiUrl + id, data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }
  deleteNode(data): Observable<any> {
    return this.http.delete(apiUrl + data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }
}
