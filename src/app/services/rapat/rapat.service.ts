import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpHeaders,
} from "@angular/common/http";
import { tap, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RapatService {
  constructor(private httpClient: HttpClient) {}
  getPegawai(): Observable<any> {
    return this.httpClient.post(environment.apiURL + "pegawai", {
      token: localStorage.getItem("access_token"),
    });
  }
  geAlltRapat(): Observable<any> {
    return this.httpClient
      .post(environment.apiURL + "rapat", {
        token: localStorage.getItem("access_token"),
      })
      .pipe(
        tap((res) => {
          localStorage.setItem("rapat", res["rapat"]);
        })
      );
  }
  getOpd(): Observable<any> {
    return this.httpClient.post(environment.apiURL + "SKPD", {
      token: localStorage.getItem("access_token"),
    });
  }
  getRapatOpd(): Observable<any> {
    return this.httpClient.post(environment.apiURL + "rapatOpd", {
      token: localStorage.getItem("access_token"),
      idOpd: localStorage.getItem("opd"),
    });
  }
  getDetailRapat(id): Observable<any> {
    return this.httpClient.post(environment.apiURL + "rapatDetail", {
      token: localStorage.getItem("access_token"),
      idTransaksi: id,
    });
  }
  tambahDokumen(idNotulen, file): Observable<any> {
    console.log(file.length);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file" + i, file.item(i), file.item(i).name);
    }
    formData.append("fileLength", file.length);
    formData.append("idNotulen", idNotulen);
    formData.append("token", localStorage.getItem("access_token"));

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    return this.httpClient.post(
      environment.apiURL + "rapatTambahFilePendukung",
      formData,
      {
        headers: headers,
      }
    );
  }
  tambahPeserta(idNotulen, namaPeserta) {
    return this.httpClient.post(environment.apiURL + "rapatTambahPeserta", {
      token: localStorage.getItem("access_token"),
      idNotulen: idNotulen,
      namaPeserta: namaPeserta,
    });
  }
  simpanDetailRapat(idNotulen, detailRapat) {
    return this.httpClient.post(environment.apiURL + "rapatEditDetail", {
      token: localStorage.getItem("access_token"),
      idNotulen: idNotulen,
      detailRapat: detailRapat,
    });
  }
  verifikasiToken(token) {
    return this.httpClient.post(environment.apiURL + "verifikasiToken", {
      token: localStorage.getItem("access_token"),
      tokenRapat: token,
    });
  }
  hapusAcara(namaAcara) {
    return this.httpClient.post(environment.apiURL + "rapatHapusAcara", {
      token: localStorage.getItem("access_token"),
      namaAcara: namaAcara,
    });
  }
  hapusKegiatan(namaKegiatan) {
    return this.httpClient.post(environment.apiURL + "rapatHapusKegiatan", {
      token: localStorage.getItem("access_token"),
      namaKegiatan: namaKegiatan,
    });
  }
  downloadFilePendukung(idNotulen, namaFile, extension): Observable<any> {
    return this.httpClient.get(
      environment.apiURL +
        "rapatDownloadFilePendukung/" +
        idNotulen +
        "/" +
        namaFile +
        "/" +
        extension,
      { responseType: "blob" }
    );

    // return this.httpClient.post<Blob>( 'http://localhost:8000/rapatDownloadFilePendukung', {'token':localStorage.getItem('access_token'),'idNotulen':idNotulen, 'namaFile':namaFile, responseType:'blob'})
  }
}
