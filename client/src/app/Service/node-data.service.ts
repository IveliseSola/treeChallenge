import { Injectable } from '@angular/core';
// import { NestedTreeControl } from '@angular/cdk/tree';
// import { MatTreeNestedDataSource } from '@angular/material/tree';
// import { BehaviorSubject } from 'rxjs';
// import { FileNode } from 'src/app/Models/FileNode';
// import { TREE_DATA } from 'src/app/Database/mockData';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = '/';
@Injectable({
  providedIn: 'root'
})
export class NodeDataService {

  constructor(private http: HttpClient) {
    this.getTree();
  }

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
  getTree(): Observable<any> {
    return this.http.get('/tree', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postRoot(data): Observable<any> {
    console.log(data);
    return this.http.post('/tree', data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  postNode(data): Observable<any> {
    return this.http.post('/node', data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  // initialize() {
  //   const dataObject = this.getNodes();
  //   console.log(dataObject);
  //   const data = this.buildFileTree(dataObject, 0);
  //   this.dataChange.next(data);
  // }

  // buildFileTree(obj: { [key: string]: any }, level: number): FileNode[] {
  //   return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
  //     const value = obj[key];
  //     const node = new FileNode();
  //     node.filename = key;

  //     if (value != null) {
  //       if (typeof value === 'object') {
  //         node.children = this.buildFileTree(value, level + 1);
  //       } else {
  //         node.type = value;
  //       }
  //     }
  //     return accumulator.concat(node);
  //   }, []);
  // }

  // getNodes() {
  //   return this.http.get('http://localhost:3000/getNodes/');
  //     // .pipe(catchError(err => throwError(err)));
  // }
}
