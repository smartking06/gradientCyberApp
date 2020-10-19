import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ENDPOINTS } from './../constants/api_constant';
@Injectable()
export class RequestService {
  private configuration = {
    baseUrl: API_ENDPOINTS.baseUrl,
  };

  constructor(private readonly http: HttpClient) {}

  // GEt method
  public get<T>(url: string, requestInfo: string) {
    return this.http
      .get<T>(this.getUrlPath(url))
      .pipe(catchError(this.handleError<T>(requestInfo)));
  }

  // POST method
  public post<T>(url: string, requestInfo: string, payload?: object) {
    return this.http
      .post<T>(this.getUrlPath(url), payload)
      .pipe(catchError(this.handleError<T>(requestInfo)));
  }

  private getUrlPath(uri: string) {
    return `${this.configuration.baseUrl}/${uri}`;
  }
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error.error);
    };
  }
}
