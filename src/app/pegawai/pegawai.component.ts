import { Component, OnInit } from "@angular/core";
import { MasterDataService } from "../services/masterData/master-data.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pegawai",
  templateUrl: "./pegawai.component.html",
  styleUrls: ["./pegawai.component.scss"],
})
export class PegawaiComponent implements OnInit {
  constructor(
    public us: MasterDataService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  pegawai: Array<any> = [{} as any];
  skpd: any = [];
  selectedOpd: string = "All";
  ngOnInit() {
    // this.us.getAll().subscribe(
    //   (data) => {
    //     this.pegawai = data["pegawai"];
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log("message : " + error);
    //   }
    // );
    this.loadNext();
    this.us.getAllSpkd().subscribe(
      (data) => {
        this.skpd = data["SKPD"];
        console.log(data);
      },
      (error) => {
        console.log("message : " + error);
      }
    );
  }
  currentSelected: string = this.selectedOpd;
  filterByOpd() {
    console.log(this.selectedOpd + " != " + this.currentSelected);
    if (this.selectedOpd != this.currentSelected) {
      console.log("true");
      this.pageToLoadNext = 1;
      this.pegawai = [{} as any];
      this.loadNext();
    }
  }
  // loadNext() {
  //   if (this.loading) { return }

  //   this.loading = true;
  //   this.placeholders = new Array(this.pageSize);
  //   this.us.getPagePegawai(this.pageToLoadNext, this.pageSize).subscribe(
  //     (data) => {
  //       this.placeholders = [];
  //       this.pegawai = data['pegawai'];
  //       this.loading = false;
  //       this.pageToLoadNext++;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log("message : " + error);
  //     }
  //   )
  // }
  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.placeholders = [];
    this.us
      .getPagePegawai(this.selectedOpd, this.pageToLoadNext, this.pageSize)
      .subscribe(
        (data) => {
          this.placeholders = [];
          this.pegawai.push(...data["pegawai"]);
          this.loading = false;
          this.pageToLoadNext++;
          console.log(data);
        },
        (error) => {
          console.log("message : " + error);
        }
      );
  }
}
