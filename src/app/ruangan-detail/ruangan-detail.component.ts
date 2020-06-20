import { Component, OnInit } from "@angular/core";
import { RuanganService } from "../services/ruangan/ruangan.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-ruangan-detail",
  templateUrl: "./ruangan-detail.component.html",
  styleUrls: ["./ruangan-detail.component.scss"],
})
export class RuanganDetailComponent implements OnInit {
  public data: Array<Object> = Array();
  constructor(
    public us: RuanganService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.us.getDetailRuangan(this.route.snapshot.params.id).subscribe(
      (data) => {
        this.data = data["detailRuangan"];
        this.data["meja_pimpinan"] =
          this.data["meja_pimpinan"] === 1 ? "Ada" : "Tidak ada";
        this.data["podium"] = this.data["podium"] === 1 ? "Ada" : "Tidak ada";
        this.data["ruang_transit"] =
          this.data["ruang_transit"] === 1 ? "Ada" : "Tidak ada";
        this.data["ruang_makan"] =
          this.data["ruang_makan"] === 1 ? "Ada" : "Tidak ada";
        console.log(this.data);
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
}
