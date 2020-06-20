import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse ,HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ERuangRapatService {
  public tes:string;
  public coba:boolean;
  constructor(private httpClient: HttpClient) {

    localStorage.setItem('url', "http://localhost:8000/");
  }

  login(username:string, password:string) {
    return this.httpClient.post<{token:  any}>(localStorage.getItem("url")+'login', {'username' :username, 'password' :password}).pipe(tap(res => {  
    localStorage.setItem('access_token', res.token);
    this.tes = "haha";
    }))
  }
  register(username:string, password:string, email:string, role_id:string, opd:string) {
    return this.httpClient.post<{access_token: string}>(localStorage.getItem("url")+'register', {username, password, email, role_id, opd}).pipe(tap(res => {
      this.login(email, password)
    }))
  }
  update(email:string)
  {
    return this.httpClient.post<{result: any}>(localStorage.getItem("url")+'update', {'token': localStorage.getItem('access_token'),'email' :email}).pipe(tap(res => {
      console.log(res.result);
    }))
  }
  logout() {
    return this.httpClient.post(localStorage.getItem("url")+'logout', {'token': localStorage.getItem('access_token')}).pipe(tap(res => {
      console.log(res);
      localStorage.removeItem('access_token');
    }))
  }
  getProfile(){
    return this.httpClient.post(localStorage.getItem("url")+'profile', {'token': localStorage.getItem('access_token')}).pipe(tap(res => {
      localStorage.setItem('name', res['user']['user_name']);
      localStorage.setItem('nip', res['user']['nip'])
      localStorage.setItem('role_id', res['user']['role_id']);
      localStorage.setItem('opd', res['user']['opd']);
      localStorage.setItem('namaOpd', res['opd']['nama_skpd']);
      localStorage.setItem('role_name', res['user']['role_name']);
    }))
  }
  getdetailtransaksi(){
    return this.httpClient.post(localStorage.getItem("url")+'detailtransaksi', {'token': localStorage.getItem('access_token')})
  }
  // test():Observable<any> {
  //   return of("test");
  // }
  // Authentication(username, password):Observable<any> {
  //   console.log(password);
  //   return this.httpClient.get("http://localhost.:8000/tes");
  // }
}
