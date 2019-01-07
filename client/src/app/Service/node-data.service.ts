import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileNode } from 'src/app/Models/FileNode';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseType } from '@angular/http/src/enums';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = '//localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {

  constructor(private http: HttpClient) { }

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


  getRoot(): Observable<any> {
    return this.http.get(apiUrl, httpOptions)
      .pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getChild(data): Observable<any> {
    return this.http.get(apiUrl + data, httpOptions)
      .pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateChild(data): Observable<any> {
    return this.http.put(apiUrl, data, httpOptions)
    .pipe(
    catchError(this.handleError)
    );
  }
  postNode(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }
  updateTree(data): Observable<any> {
    return this.http.put(apiUrl, data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }
}
