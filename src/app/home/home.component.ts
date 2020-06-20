import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { formatDate } from "@angular/common";
import { ERuangRapatService } from "../e-ruang-rapat.service";
import { Router } from "@angular/router";
import { NbWindowService } from "@nebular/theme";
import { NbDialogService } from "@nebular/theme";
import { DialogCalenderComponent } from "../dialog-calender/dialog-calender.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("contentTemplate", { static: false }) contentTemplate: TemplateRef<
    any
  >;
  constructor(
    public us: ERuangRapatService,
    private router: Router,
    private windowService: NbWindowService,
    private dialogService: NbDialogService
  ) {}
  username: string;
  role_id: string;
  role_name: string;
  opd: string;
  userlogin: string;
  dateEvent: string;
  filter: any;
  date = new Date();
  database: Array<any> = [{}];
  db: Array<any> = [{}];
  tampung: string = "date =>";
  myDate = new Date();
  acara: any[] = [];
  ngOnInit() {
    // if(localStorage.getItem('access_token') == null)
    // {
    //   this.router.navigate(['login'])
    // }
    // else{
    //   this.us.getProfile().subscribe((data)=>{
    //     this.username = localStorage.getItem('username');
    //   });

    // }
    this.us.getdetailtransaksi().subscribe(
      (data) => {
        for (let item of data["rapat"]) {
          // console.log(item['start'].split(" ")[0] + " == " + formatDate(this.myDate, 'yyyy-MM-dd', 'en'));
          if (
            item["start"].split(" ")[0] ==
            formatDate(this.myDate, "yyyy-MM-dd", "en")
          ) {
            this.acara.push(item);
          }
          this.acara.slice();
          this.dateEvent = item["start"];
          const tahun = this.dateEvent.substr(0, 4);
          let bulan: any = this.dateEvent.substr(5, 2);
          bulan = parseInt(bulan) - 1;
          let tanggal = this.dateEvent.substr(8, 2);
          if (this.tampung != "date =>") {
            this.tampung += " || ";
          }
          this.tampung +=
            "(date.getDate() === " +
            parseInt(tanggal) +
            " && " +
            "date.getMonth() ===" +
            bulan +
            " && " +
            "date.getFullYear() ===" +
            tahun +
            ")";
        }

        this.filter = eval(this.tampung);
        this.database.slice();
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(["login"]);
      }
    );
    this.us.getProfile().subscribe(
      (data) => {
        this.username = localStorage.getItem("username");
        this.role_id = localStorage.getItem("role_id");
        this.role_name = localStorage.getItem("role_name");
        this.opd = localStorage.getItem("opd");
        if (this.role_id == "3") {
          this.userlogin = "Administrator Sistem";
          console.log("masuk if");
        } else {
          this.userlogin = localStorage.getItem("namaOpd");
          console.log(this.role_id);
          console.log(this.userlogin);
        }
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(["login"]);
      }
    );
  }
  cek(event: any) {
    var pimpinan = "";
    var lokasi = "";
    var opd = "";

    var jadwal = formatDate(this.date, "yyyy-MM-dd", "en");

    this.dialogService.open(DialogCalenderComponent, {
      context: {
        jadwal: jadwal,
      },
    });
    this.us.getdetailtransaksi().subscribe(
      (data) => {
        // for (var i = 0; i < data['rapat'].length; ++i) {
        //   var datatanggal = data['rapat'][i]['start']
        //   var tanggal = datatanggal.substr(8, 2)
        //   if (tanggal == x) {
        //     pimpinan = data['rapat'][i]['pimpinan_rapat']
        //     lokasi = data['rapat'][i]['lokasi']
        //     this.windowService.open(
        //       this.contentTemplate,
        //       { title: data['rapat'][i]['judul_rapat'], context: { pemimpin: pimpinan, lokasi: lokasi, opd: data['rapat'][i]['nama_skpd'], start: data['rapat'][i]['start'], finish: data['rapat'][i]['finish'] } },
        //     );
        //   }
        // }
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(["login"]);
      }
    );
  }
}
