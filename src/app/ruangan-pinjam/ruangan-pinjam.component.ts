import { Component, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Observable } from "rxjs"; //
import { RuanganService } from "../services/ruangan/ruangan.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import { NbToastrService } from "@nebular/theme";

export interface detailPinjaman {
  idLokasi: string;
  judulRapat: string;
  tanggalRapat: string;
  waktuMulai: Object;
  waktuSelesai: Object;
  namaPeminjam: string;
  namaPemimpinRapat: string;
  keterangan: string;
  namaNotulen: string;
  // filePermohonan: File;
  // fileUndangan: File;
  fileTransaksi: FileList;
  opd: string;
}

@Component({
  selector: "app-ruangan-pinjam",
  templateUrl: "./ruangan-pinjam.component.html",
  styleUrls: ["./ruangan-pinjam.component.scss"],
})
export class RuanganPinjamComponent implements OnInit {
  constructor(
    public us: RuanganService,
    private router: Router,
    public route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {}

  detailPinjaman: detailPinjaman = {
    idLokasi: this.route.snapshot.params.id,
    judulRapat: "",
    tanggalRapat: "",
    waktuMulai: { hour: 13, minute: 30 },
    waktuSelesai: { hour: 15, minute: 30 },
    namaPeminjam: "",
    namaPemimpinRapat: "",
    keterangan: "",
    namaNotulen: "",
    fileTransaksi: null,
    opd: localStorage.getItem("opd"),
  };
  role = localStorage.getItem("role_id");
  namaPegawai: any = [];
  notulen: any = [];
  master_opd: any = [];

  ngOnInit() {
    if (this.role != "3") {
      this.detailPinjaman.namaPeminjam =
        localStorage.getItem("nip") + " -" + localStorage.getItem("name");
    }
    console.log(this.detailPinjaman["idLokasi"]);
    this.us.getPegawai().subscribe(
      (data) => {
        for (let pegawai of data["pegawai"]) {
          this.namaPegawai.push(pegawai["nip18"] + " - " + pegawai["nama"]);
          this.namaPegawai.slice();
        }
      },
      (error) => {
        if ((error["status"] = 401)) {
          localStorage.clear();
          this.router.navigate(["login"]);
          console.log(error["status"]);
        } else {
          console.log(error["status"]);
        }
      }
    );
    this.us.getNotulen().subscribe(
      (data) => {
        for (let notulen of data["notulen"]) {
          this.notulen.push(
            notulen["nip_pimpinan"] + " - " + notulen["nama_pimpinan"]
          );
          this.namaPegawai.slice();
        }
      },
      (error) => {
        if ((error["status"] = 401)) {
          localStorage.clear();
          this.router.navigate(["login"]);
        } else {
          console.log(error["status"]);
        }
      }
    );
    this.us.getSKPD().subscribe(
      (data) => {
        console.log(data);
        this.master_opd = data["SKPD"];
      },
      (error) => {
        if ((error["status"] = 401)) {
          localStorage.clear();
          this.router.navigate(["login"]);
        } else {
          console.log(error["status"]);
        }
      }
    );
  }
  searchNamaPemimpinRapat = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.namaPegawai
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  searchNotulen = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.notulen
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  searchPeminjam = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.namaPegawai
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  // handleFilePermohonan(files: FileList) {
  //   this.detailPinjaman['filePermohonan'] = files.item(0);
  // }
  // handleFileUndangan(files: FileList) {
  //   if(files.length > 0) {
  //     this.detailPinjaman['fileUndangan'] = files[0];
  //   }

  // }
  handleFileDokumen(files: FileList) {
    this.detailPinjaman.fileTransaksi = files;
  }
  pinjamRuangan(position: any = "top-right", status: any = "success") {
    console.log(this.detailPinjaman);
    this.us.pinjamRuangan(this.detailPinjaman).subscribe(
      (data) => {
        this.master_opd = data["SKPD"];
        console.log(data);
        this.toastrService.show(
          status || "Success",
          `Ruangan Berhasil Di Tambahkan`,
          { position, status }
        );
        this.router.navigate(["/permohonan"]);
      },
      async (error) => {
        if ((error["status"] = 401)) {
          console.log(error);
          // await localStorage.clear();
          // this.router.navigate(["login"]);
        } else {
          console.log(error["status"]);
        }
      }
    );
  }
}
