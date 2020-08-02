import { Component, OnInit, TemplateRef } from "@angular/core";
import { RapatService } from "../services/rapat/rapat.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { NbDialogService, NbDialogRef, NbToastrService } from "@nebular/theme";

export interface detailRapat {
  idNotulen: any;
  judulRapat: string;
  ketua: string;
  pencatat: string;
  sekretaris: string;
  kataPembuka: string;
  pembahasan: string;
  peraturan: string;
  acara: Array<any>;
  kegiatan: Array<any>;
  daftarPeserta: Array<any>;
  filePendukung: Array<any>;
}

@Component({
  selector: "app-rapat-edit",
  templateUrl: "./rapat-edit.component.html",
  styleUrls: ["./rapat-edit.component.scss"],
})
export class RapatEditComponent implements OnInit {
  constructor(
    public us: RapatService,
    private router: Router,
    public route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}
  detailRapat: detailRapat = {
    idNotulen: "",
    judulRapat: "",
    ketua: "",
    pencatat: "",
    sekretaris: "",
    kataPembuka: "",
    pembahasan: "",
    peraturan: "",
    acara: [],
    kegiatan: [],
    daftarPeserta: [],
    filePendukung: [],
  };
  idRapat: any = this.route.snapshot.params.id;
  judulAcara: string;
  judulKegiatan: string;
  pesertaRapat: string;
  namaPegawai: any = [];
  tampungFilePendukung: FileList;
  ngOnInit() {
    this.us.getDetailRapat(this.route.snapshot.params.id).subscribe(
      (data) => {
        // console.log(data);
        this.detailRapat.judulRapat = data["detailRapat"]["judul_rapat"];
        this.detailRapat.idNotulen = data["detailRapat"]["id"];
        this.detailRapat.ketua =
          data["detailRapat"]["nip_pimpinan"] +
          " - " +
          data["detailRapat"]["nama_pimpinan"];
        this.detailRapat.sekretaris =
          data["detailRapat"]["nip_sekretaris"] +
          " - " +
          data["detailRapat"]["nama_sekretaris"];
        this.detailRapat.pencatat =
          data["detailRapat"]["nip_notulen"] +
          " - " +
          data["detailRapat"]["nama_notulen"];
        this.detailRapat.kataPembuka = data["detailRapat"]["kata_pembuka"];
        this.detailRapat.pembahasan = data["detailRapat"]["hasil_rapat"];
        this.detailRapat.peraturan = data["detailRapat"]["peraturan"];
        this.detailRapat.acara = data["acara"];
        this.detailRapat.kegiatan = data["kegiatan"];
        this.detailRapat.filePendukung = data["filePendukung"];
        this.detailRapat.daftarPeserta = data["pesertaRapat"];
        this.detailRapat.acara = this.detailRapat.acara.slice();
        this.detailRapat.kegiatan = this.detailRapat.kegiatan.slice();
        // this.detailRapat.filePendukung = this.detailRapat.filePendukung.slice();
        this.detailRapat.daftarPeserta = this.detailRapat.daftarPeserta.slice();
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
    this.us.getPegawai().subscribe(
      (data) => {
        for (let pegawai of data["pegawai"]) {
          this.namaPegawai.push(pegawai["nip"] + " - " + pegawai["nama"]);
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
  }

  tambahAcara() {
    for (let i = 0; i < this.detailRapat.acara.length; i++) {
      if (this.judulAcara == this.detailRapat.acara[i]["nama"]) {
        return;
      }
    }
    this.detailRapat.acara.push({ nama: this.judulAcara });
  }
  tambahKegiatan() {
    for (let i = 0; i < this.detailRapat.kegiatan.length; i++) {
      if (this.judulKegiatan == this.detailRapat.kegiatan[i]["nama"]) {
        return;
      }
    }
    this.detailRapat.kegiatan.push({ nama: this.judulKegiatan });
  }
  simpan(position, status) {
    console.log(this.detailRapat.kegiatan);
    this.us
      .simpanDetailRapat(this.detailRapat.idNotulen, this.detailRapat)
      .subscribe(
        (data) => {
          console.log(data);

          this.toastrService.show(
            status || "Success",
            `Detail Rapat berhasil disimpan`,
            { position, status }
          );
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
  tambahFile() {
    this.us
      .tambahDokumen(this.detailRapat.idNotulen, this.tampungFilePendukung)
      .subscribe(
        (data) => {
          for (let i = 0; i < this.tampungFilePendukung.length; i++) {
            this.detailRapat.filePendukung.push({
              name: this.tampungFilePendukung.item(i)["name"],
            });
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
  }
  tambahPeserta() {
    let insert = true;
    for (let item of this.detailRapat.daftarPeserta) {
      if (item.nip == this.pesertaRapat.split(" - ")[0]) insert = false;
    }
    if (insert) {
      this.us
        .tambahPeserta(this.detailRapat.idNotulen, this.pesertaRapat)
        .subscribe(
          (data) => {
            console.log(data["message"]);
            this.detailRapat.daftarPeserta.push({
              nip: this.pesertaRapat.split(" - ")[0],
              nama: this.pesertaRapat.split(" - ")[1],
            });
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
  }
  handleFileDokumen(files: FileList) {
    this.tampungFilePendukung = files;
  }
  searchNamaPegawai = (text$: Observable<string>) =>
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
  ref: any;
  namaAcara: string;
  openDialogHapusAcara(dialog: TemplateRef<any>, namaAcara) {
    console.log(namaAcara);
    this.namaAcara = namaAcara;
    this.ref = this.dialogService.open(dialog, {
      context: "Apakah anda yakin ingin menghapus?",
    });
  }
  hapusAcara() {
    console.log(this.namaAcara);
    this.us.hapusAcara(this.namaAcara).subscribe(
      (data) => {
        console.log(this.namaAcara);
        for (let index = 0; index < this.detailRapat.acara.length; index++) {
          if (this.detailRapat.acara[index]["nama"] == this.namaAcara) {
            this.detailRapat.acara.splice(index, 1);
            this.ref.close();
          }
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
  }
  namaKegiatan: string;
  openDialogHapusKegiatan(dialog: TemplateRef<any>, namaKegiatan) {
    this.namaKegiatan = namaKegiatan;
    this.ref = this.dialogService.open(dialog, {
      context: "Apakah anda yakin ingin menghapus?",
    });
  }
  hapusKegiatan() {
    this.us.hapusKegiatan(this.namaKegiatan).subscribe(
      (data) => {
        console.log(this.namaKegiatan);
        for (let index = 0; index < this.detailRapat.kegiatan.length; index++) {
          if (this.detailRapat.kegiatan[index]["nama"] == this.namaKegiatan) {
            this.detailRapat.kegiatan.splice(index, 1);
            this.ref.close();
          }
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
  }
}
