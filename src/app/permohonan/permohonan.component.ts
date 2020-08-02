import { Component, OnInit } from "@angular/core";
import { PermohonanService } from "../services/permohonan/permohonan.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

export interface Permohonan {
  id: number;
  judul: string;
  tanggal: string;
  start: string;
  finish: string;
  status: string;
}
@Component({
  selector: "app-permohonan",
  templateUrl: "./permohonan.component.html",
  styleUrls: ["./permohonan.component.scss"],
})
export class PermohonanComponent implements OnInit {
  constructor(
    public us: PermohonanService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  permohonan: Array<Permohonan> = [];
  ngOnInit() {
    this.us.getAll().subscribe(
      (data) => {
        console.log(data);
        for (let items of data["rapat"]) {
          console.log(localStorage.getItem("nip") + " " + items["nip_pemesan"]);
          if (
            localStorage.getItem("nip").substring(0, 15) ==
              items["nip_pemesan"].substring(0, 15) ||
            localStorage.getItem("role_id") == "3"
          ) {
            this.permohonan.push({
              id: items["id"],
              judul: items["judul_rapat"],
              tanggal: items["start"].split(" ")[0],
              start: items["start"].split(" ")[1],
              finish: items["finish"].split(" ")[1],
              status: items["status"],
            });
          }
        }
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(["home"]);
      }
    );
  }
}
