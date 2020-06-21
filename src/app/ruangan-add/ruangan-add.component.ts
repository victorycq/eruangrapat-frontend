import { Component, HostBinding, OnInit } from "@angular/core";
import { RuanganService } from "../services/ruangan/ruangan.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";

export interface detailRuangan {
  nama: string;
  lokasi: string;
  opd: string;
  kapasitas: number;
  keterangan: string;
  koorX: string;
  koorY: string;
  contact: string;
}
export interface fasilitasRuangan {
  mejaPimpinan: number;
  podium: number;
  mejaPeserta: number;
  kursiPeserta: number;
  microphone: number;
  papanTulis: number;
  ruangTransit: number;
  ruangMakan: number;
  ac: number;
  lcdTv: number;
  projektor: number;
}

@Component({
  selector: "app-ruangan-add",
  templateUrl: "./ruangan-add.component.html",
  styleUrls: ["./ruangan-add.component.scss"],
})
export class RuanganAddComponent implements OnInit {
  @HostBinding("class")
  classes = "example-items-rows";

  constructor(
    public us: RuanganService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  detailRuangan: detailRuangan = {
    nama: "",
    lokasi: "",
    opd: "",
    kapasitas: null,
    keterangan: "",
    koorX: "",
    koorY: "",
    contact: "",
  };
  fasilitasRuangan: fasilitasRuangan = {
    mejaPimpinan: null,
    podium: null,
    mejaPeserta: null,
    kursiPeserta: null,
    microphone: null,
    papanTulis: null,
    ruangTransit: null,
    ruangMakan: null,
    ac: null,
    lcdTv: null,
    projektor: null,
  };

  master_opd: any = [];

  ngOnInit() {
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
  showPosition(position) {
    console.log(this.detailRuangan);
    this.detailRuangan.koorX = "90";
    this.detailRuangan.koorY = String(position.coords.latitude);
  }
  toggle(variable: string, checked: boolean) {
    if (variable == "mejaPimpinan") {
      if (checked == true) {
        this.fasilitasRuangan.mejaPimpinan = 1;
      } else {
        this.fasilitasRuangan.mejaPimpinan = null;
      }
    } else if (variable == "podium") {
      if (checked == true) {
        this.fasilitasRuangan.podium = 1;
      } else {
        this.fasilitasRuangan.podium = null;
      }
    } else if (variable == "ruangTransit") {
      if (checked == true) {
        this.fasilitasRuangan.ruangTransit = 1;
      } else {
        this.fasilitasRuangan.ruangTransit = null;
      }
    } else if (variable == "ruangMakan") {
      if (checked == true) {
        this.fasilitasRuangan.ruangMakan = 1;
      } else {
        this.fasilitasRuangan.ruangMakan = null;
      }
    }
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({
            longitude: resp.coords.longitude,
            latitude: resp.coords.latitude,
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  async tambahRuangan(position, status) {
    await this.getPosition().then((position) => {
      this.detailRuangan.koorX = position.longitude;
      this.detailRuangan.koorY = position.latitude;
    });

    console.log(this.detailRuangan);
    this.us.tambahRuangan(this.detailRuangan, this.fasilitasRuangan).subscribe(
      (data) => {
        this.toastrService.show(
          status || "Success",
          `Ruangan Berhasil Di Tambahkan`,
          { position, status }
        );
      },
      (error) => {
        if ((error["status"] = 401)) {
          // localStorage.clear();
          // this.router.navigate(['login']);
          console.log(error["status"]);
        }
      }
    );
  }
}
