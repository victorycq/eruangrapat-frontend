import { Component, OnInit } from "@angular/core";
import { RapatService } from "../services/rapat/rapat.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NbUserComponent } from "@nebular/theme";

@Component({
  selector: "app-rapat",
  templateUrl: "./rapat.component.html",
  styleUrls: ["./rapat.component.scss"],
})
export class RapatComponent implements OnInit {
  constructor(
    public us: RapatService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  page = 1;
  pageSize = 4;
  collectionSize: number;
  rapat: Array<any> = [];
  ngOnInit() {
    if (localStorage.getItem("role_id") === "3") {
      this.us.geAlltRapat().subscribe(
        (data) => {
          this.collectionSize = data["rapat"].length;
          for (let item of data["rapat"]) {
            console.log(item);
            this.rapat.push(item);
          }
          this.rapat.slice();
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
    } else {
      this.us.getRapatOpd().subscribe(
        (data) => {
          this.collectionSize = data["rapat"].length;
          for (let item of data["rapat"]) {
            item.id_notulen = item["id"];
            if (item["status"] === "Disetujui") this.rapat.push(item);
          }
          this.rapat.slice();
          console.log(this.rapat);
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
}
