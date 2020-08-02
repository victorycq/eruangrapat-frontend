import { Component, OnInit } from "@angular/core";
import { RapatService } from "../services/rapat/rapat.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DialogVerifikasiTokenComponent } from "../dialog-verifikasi-token/dialog-verifikasi-token.component";
import * as FileSaver from "file-saver";

export interface detailRapat {
  judulRapat: string;
  ketua: string;
  sekretaris: string;
  pencatat: string;
  tanggal: string;
  jam: string;
  keterangan: string;
  kataPembuka: string;
  pembahasan: string;
  peraturan: string;
  token: string;
  acara: Array<any>;
  kegiatan: Array<any>;
  daftarPeserta: Array<any>;
  filePendukung: Array<any>;
}
@Component({
  selector: "app-rapat-detail",
  templateUrl: "./rapat-detail.component.html",
  styleUrls: ["./rapat-detail.component.scss"],
})
export class RapatDetailComponent implements OnInit {
  constructor(
    public us: RapatService,
    private router: Router,
    public route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}
  detailRapat: detailRapat = {
    judulRapat: "",
    ketua: "",
    sekretaris: "",
    pencatat: "",
    tanggal: "",
    jam: "",
    keterangan: "",
    kataPembuka: "",
    pembahasan: "",
    peraturan: "",
    token: "",
    acara: [],
    kegiatan: [],
    daftarPeserta: [],
    filePendukung: [],
  };
  daftarPeserta: Array<any> = [];
  token: boolean = false;
  idNotulen: any = this.route.snapshot.params.id;
  names: string[] = [];
  ngOnInit() {
    this.us.getDetailRapat(this.route.snapshot.params.id).subscribe(
      (data) => {
        console.log(data);
        this.detailRapat.judulRapat = data["detailRapat"]["judul_rapat"];

        this.detailRapat.ketua = data["detailRapat"]["nama_pimpinan"];
        this.detailRapat.sekretaris = data["detailRapat"]["nama_sekretaris"];
        this.detailRapat.pencatat = data["detailRapat"]["nama_notulen"];
        this.detailRapat.tanggal = data["detailRapat"]["waktu_start"].split(
          " "
        )[0];
        this.detailRapat.jam = data["detailRapat"]["waktu_start"].split(" ")[1];
        this.detailRapat.keterangan = data["detailRapat"]["keterangan"];
        this.detailRapat.kataPembuka = data["detailRapat"]["kata_pembuka"];
        this.detailRapat.pembahasan = data["detailRapat"]["hasil_rapat"];
        this.detailRapat.peraturan = data["detailRapat"]["peraturan"];
        this.detailRapat.token = data["detailRapat"]["token"];
        this.detailRapat.acara = data["acara"];
        this.detailRapat.kegiatan = data["kegiatan"];
        this.detailRapat.filePendukung = data["filePendukung"];
        this.detailRapat.daftarPeserta = data["pesertaRapat"];
        this.detailRapat.acara = this.detailRapat.acara.slice();
        this.detailRapat.kegiatan = this.detailRapat.kegiatan.slice();
        this.detailRapat.filePendukung = this.detailRapat.filePendukung.slice();
        this.detailRapat.daftarPeserta = this.detailRapat.daftarPeserta.slice();
        console.log(
          data["detailRapat"]["nip_pemesan"].substring(0, 18) +
            " " +
            localStorage.getItem("nip")
        );
        if (
          localStorage.getItem("role_id") === "3" ||
          data["detailRapat"]["nip_pemesan"].substring(0, 18) ==
            localStorage.getItem("nip")
        ) {
          this.token = true;
        }
        // else {
        //   for (let item of this.detailRapat.daftarPeserta) {
        //     console.log(item.nip + " " + localStorage.getItem("nip"));
        //     if (item.nip == localStorage.getItem("nip")) {
        //       this.token = true;
        //     }
        //   }
        // }
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(["login"]);
      }
    );
  }
  editRapat() {
    // console.log();
    if (this.token == false) {
      localStorage.setItem("verifikasiToken", this.detailRapat.token);
      localStorage.setItem("idRapat", this.idNotulen);
      this.dialogService
        .open(DialogVerifikasiTokenComponent)
        .onClose.subscribe((name) => name && this.names.push(name));
    } else {
      this.router.navigate(["/editRapat/" + this.idNotulen]);
    }
  }
  downloadFilePendukung(idNotulen, namaFile) {
    var extension = namaFile.split(".")[1];
    var namaFile = namaFile.split(".")[0];
    this.us.downloadFilePendukung(idNotulen, namaFile, extension).subscribe(
      (data) => {
        console.log(data);
        FileSaver.saveAs(data, namaFile);
      },
      (error) => {
        // localStorage.clear();
        // this.router.navigate(['login']);
        console.log(error);
      }
    );
  }
}
