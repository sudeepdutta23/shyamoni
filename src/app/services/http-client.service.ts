import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient, private appService: AppService) { }

  post = (url: string, body: any = {},userType: string, isFormData = false) =>
    this.http
      .post<any>(
        `${environment.baseURI}${url}`,
        body,
        this.appService.getHttpHeader(userType, isFormData)
      )
      .pipe(catchError(this.appService.handleError));

  get = (url: string,userType: string) => {
    return this.http
      .get<any>(`${environment.baseURI}${url}`, this.appService.getHttpHeader(userType))
      .pipe(catchError(this.appService.handleError));
  };

  getPdf = (url: string, userType: string) =>{
    return this.http.get(`${environment.baseURI}${url}`,{ responseType: 'arraybuffer', headers: { 'Content-Type': 'application/octet-stream', Authorization: `Bearer ${localStorage.getItem('userToken')}` }  })
  }

  put = (url: string, body: any, userType: string, isFormData = false) => {
    return this.http
      .put<any>(
        `${environment.baseURI}${url}`,
        body,
        this.appService.getHttpHeader(userType, isFormData)
      )
      .pipe(catchError(this.appService.handleError));
  };

  delete = (url: string, userType: string) => {
    return this.http
      .delete<any>(
        `${environment.baseURI}${url}`,
        this.appService.getHttpHeader(userType)
      )
      .pipe(catchError(this.appService.handleError));
  };


}
