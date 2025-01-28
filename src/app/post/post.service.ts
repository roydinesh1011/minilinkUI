import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Post } from './post';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiURL = "http://localhost:8080";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    })
  }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
    
  /**
   * Method to call the API to get all the mappings between Long URL and MiniLink URL
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/post/All')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Method to call the API to create the minilink URL
   *
   * @return response()
   */
  create(post:Post): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/post/create', JSON.stringify(post), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  /**
   * Method to call the API to get the actual URL when the minilink url is passed
   *
   * @return response()
   */
  find(id:string): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/post/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
      
  /** 
   * Method to handle the errors thrown from the Rest Service
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.text;
    }
    return throwError(errorMessage);
 }
}