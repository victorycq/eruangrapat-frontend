import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpHeaders,
} from "@angular/common/http";
import { tap, retry } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RuanganService {
  constructor(private httpClient: HttpClient) {}

  getRuangan(): Observable<any> {
    return this.httpClient
      .post("http://localhost:8000/ruangan", {
        token: localStorage.getItem("access_token"),
        opd: "tes",
      })
      .pipe(
        tap((res) => {
          localStorage.setItem("ruangan", res["ruangan"]);
        })
      );
  }
  getDetailRuangan(id): Observable<any> {
    return this.httpClient.post("http://localhost:8000/ruanganDetail", {
      token: localStorage.getItem("access_token"),
      id_ruangrapat: id,
    });
  }
  getNotulen(): Observable<any> {
    return this.httpClient.post("http://localhost:8000/notulen", {
      token: localStorage.getItem("access_token"),
    });
  }
  getPegawai(): Observable<any> {
    return this.httpClient.post("http://localhost:8000/pegawai", {
      token: localStorage.getItem("access_token"),
    });
  }
  getSKPD(): Observable<any> {
    return this.httpClient.post("http://localhost:8000/SKPD", {
      token: localStorage.getItem("access_token"),
    });
  }
  pinjamRuangan(detailPinjaman): Observable<any> {
    // return this.httpClient.post('http://localhost:8000/ruanganPinjam', {'token':localStorage.getItem('access_token'), 'pinjamRuangan' :detailPinjaman});
    const formData = new FormData();

    if (detailPinjaman["fileTransaksi"] != null) {
      for (let i = 0; i < detailPinjaman["fileTransaksi"].length; i++) {
        formData.append(
          "file" + i,
          detailPinjaman["fileTransaksi"].item(i),
          detailPinjaman["fileTransaksi"].item(i).name
        );
      }
      formData.append("fileLength", detailPinjaman["fileTransaksi"].length);
    }
    formData.append("detailPinjaman", JSON.stringify(detailPinjaman));
    formData.append("token", localStorage.getItem("access_token"));
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    return this.httpClient.post(
      "http://localhost:8000/ruanganPinjam",
      formData,
      {
        headers: headers,
      }
    );
  }
  tambahRuangan(detailRuangan, fasilitasRuangan): Observable<any> {
    console.log(detailRuangan);
    return this.httpClient.post("http://localhost:8000/ruanganTambah", {
      token: localStorage.getItem("access_token"),
      detailRuangan: detailRuangan,
      fasilitasRuangan: fasilitasRuangan,
    });
  }
  editRuangan(idRuangan, detailRuangan, detailFasilitas): Observable<any> {
    return this.httpClient.post("http://localhost:8000/ruanganEdit", {
      token: localStorage.getItem("access_token"),
      idRuangan: idRuangan,
      detailRuangan: detailRuangan,
      fasilitasRuangan: detailFasilitas,
    });
  }
  deleteRuangan(idRuangan) {
    return this.httpClient.post("http://localhost:8000/ruanganHapus", {
      token: localStorage.getItem("access_token"),
      idRuangan: idRuangan,
    });
  }
}
