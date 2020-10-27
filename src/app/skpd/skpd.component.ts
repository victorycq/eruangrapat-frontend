import { Component, OnInit } from "@angular/core";
import { MasterDataService } from "../services/masterData/master-data.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-skpd",
  templateUrl: "./skpd.component.html",
  styleUrls: ["./skpd.component.scss"],
})
export class SkpdComponent implements OnInit {
  constructor(
    public us: MasterDataService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  roleId: any = localStorage.getItem("role_id");
  skpd: Array<any> = [{}] as any;
  ngOnInit() {
    this.loadNext();
  }
  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.placeholders = [];
    this.us.getPageSKPD(this.pageToLoadNext, this.pageSize).subscribe(
      (data) => {
        console.log(data);
        this.placeholders = [];
        this.skpd.push(...data["SKPD"]);
        this.loading = false;
        this.pageToLoadNext++;
        console.log(this.skpd);
      },
      (error) => {
        console.log("message : " + error);
      }
    );
  }
}
