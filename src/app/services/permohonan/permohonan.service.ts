import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermohonanService {

  constructor(private httpClient: HttpClient) { }
  getAll():Observable<any>{
    return this.httpClient.post('http://localhost:8000/permohonan', {'token':localStorage.getItem('access_token')})
  }
  detailPermohonan(id):Observable<any>{
    console.log(id);
    return this.httpClient.post('http://localhost:8000/permohonanDetail', {'token':localStorage.getItem('access_token'), 'idPermohonan': id})
  }
  ubahStatus(id, status):Observable<any>{
    return this.httpClient.post('http://localhost:8000/permohonanEdit', {'token':localStorage.getItem('access_token'), 'idPermohonan': id, 'status': status})
  }
  downloadFileTransaksi(idTransaksi, namaFile, extension):Observable<any> {
    // console.log(idTransaksi+" - " + namaFile + " - " + extension);
    // let params = new HttpParams();
    //    params = params.append('idTransaksi', '75');
    //    params = params.append('namaFile', 'haha');
    //    params = params.append('extension', 'xls');
    return this.httpClient
    .get('http://localhost:8000/permohonanDownloadFileTransaksi/'+idTransaksi+'/'+namaFile+'/'+extension,{responseType: "blob"});
  }
}
