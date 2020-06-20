import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private httpClient: HttpClient) { }
  getAll():Observable<any>{
    return this.httpClient.post('http://localhost:8000/pegawai', {'token':localStorage.getItem('access_token')})
  }
  getPagePegawai(opd,page, pageSize):Observable<any>{
    return this.httpClient.post('http://localhost:8000/pegawaiPage', {'token':localStorage.getItem('access_token'),'opd':opd, 'page':page, 'pageSize':pageSize})
  }
  getPegawaiOpd(opd):Observable<any> {
    return this.httpClient.post('http://localhost:8000/pegawaiOpd', {'token':localStorage.getItem('access_token'), 'opd':opd})
  }
  getAllSpkd():Observable<any>{
    return this.httpClient.post('http://localhost:8000/SKPD', {'token':localStorage.getItem('access_token')})
  }
  getPageSKPD(page, pageSize):Observable<any>{
    return this.httpClient.post('http://localhost:8000/SKPDPage', {'token':localStorage.getItem('access_token'), 'page':page, 'pageSize':pageSize})
  }
  storeSkpd(skpd):Observable<any>{
    return this.httpClient.post('http://localhost:8000/skpdStore', {'token':localStorage.getItem('access_token'), 'skpd':skpd})
  }
}
