import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, JsonpClientBackend } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';
import * as database from '../assets/database.json';

@Injectable({
  providedIn: 'root'
})
export class CrudService implements OnInit{

  private apiServer = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  list: Product[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(){
    this.getAll().subscribe((res:Product[])=>{
      this.list=res;
    });
  }

  create(product:Product): void {
    console.log('entered in create');
    // this.httpClient.post<Product>("assets/database.json" ,JSON.stringify(product)).subscribe(curdata=>{
    //   this.list.push(curdata);
    // });
    this.httpClient.post<Product>('http://localhost:4200/assets/database',product,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    this.list.push(product);
    console.log(this.list);
  }  
  getById(id:any): Observable<Product> {
    return this.httpClient.get<Product>("assets/database.json" + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Product[]> {
    console.log('entered in getall');
    return this.httpClient.get<Product[]>("assets/database.json")
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:any, product:any): Observable<Product> {
    return this.httpClient.put<Product>("assets/database.json" + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:any){
    return this.httpClient.delete<Product>("assets/database.json"+ id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}