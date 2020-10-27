import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpHeaders,
} from "@angular/common/http";
import { tap, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class MasterDataService {
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<any> {
    return this.httpClient.post(environment.apiURL + "pegawai", {
      token: localStorage.getItem("access_token"),
    });
  }
  getPagePegawai(opd, page, pageSize): Observable<any> {
    return this.httpClient.post(environment.apiURL + "pegawaiPage", {
      token: localStorage.getItem("access_token"),
      opd: opd,
      page: page,
      pageSize: pageSize,
    });
  }
  getPegawaiOpd(opd): Observable<any> {
    return this.httpClient.post(environment.apiURL + "pegawaiOpd", {
      token: localStorage.getItem("access_token"),
      opd: opd,
    });
  }
  getAllSpkd(): Observable<any> {
    return this.httpClient.post(environment.apiURL + "SKPD", {
      token: localStorage.getItem("access_token"),
    });
  }
  getPageSKPD(page, pageSize): Observable<any> {
    return this.httpClient.post(environment.apiURL + "SKPDPage", {
      token: localStorage.getItem("access_token"),
      page: page,
      pageSize: pageSize,
    });
  }
  storeSkpd(skpd): Observable<any> {
    return this.httpClient.post(environment.apiURL + "skpdStore", {
      token: localStorage.getItem("access_token"),
      skpd: skpd,
    });
  }
}
