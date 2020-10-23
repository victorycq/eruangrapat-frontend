import { Component, OnInit } from "@angular/core";
import { PermohonanService } from "../services/permohonan/permohonan.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-permohonan-detail",
  templateUrl: "./permohonan-detail.component.html",
  styleUrls: ["./permohonan-detail.component.scss"],
})
export class PermohonanDetailComponent implements OnInit {
  constructor(
    public us: PermohonanService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  permohonan: any = {} as any;
  filePermohonan: Array<any> = [];
  status: string = "";
  role_id:string = localStorage.getItem("role_id");
  ngOnInit() {
    this.us.detailPermohonan(this.route.snapshot.params.id).subscribe(
      (data) => {
        // this.filePermohonan = data["fileTransaksi"];
        if (data["fileTransaksi"] != null)
          this.filePermohonan = data["fileTransaksi"];
        this.permohonan = data["permohonan"];
        this.permohonan["pimpinan_rapat"] =
          this.permohonan["nip_pimpinan"] +
          " - " +
          this.permohonan["pimpinan_rapat"];
        this.permohonan["nama_notulen"] =
          this.permohonan["nip_notulen"] +
          " - " +
          this.permohonan["nama_notulen"];
        console.log(this.permohonan);
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(["home"]);
      }
    );
  }
  downloadFileTransaksi(idTransaksi, namaFile) {
    var extension = namaFile.split(".")[1];
    var namaFile = namaFile.split(".")[0];
    this.us.downloadFileTransaksi(idTransaksi, namaFile, extension).subscribe(
      (data) => {
        console.log(data);
        FileSaver.saveAs(data, namaFile);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  simpanPerubahan() {
    this.us.ubahStatus(this.route.snapshot.params.id, this.status).subscribe(
      (data) => {
        this.permohonan.status = this.status;
        console.log("message : " + data);
        this.router.navigate(["/permohonan"]);
      },
      (error) => {
        console.log("message : " + error);
      }
    );
  }
}
