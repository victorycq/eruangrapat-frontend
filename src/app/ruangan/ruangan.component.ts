import { Component, OnInit } from "@angular/core";
import { NbSidebarService, NbTreeGridDataSourceBuilder } from "@nebular/theme";
import { RuanganService } from "../services/ruangan/ruangan.service";

import { Router } from "@angular/router";

// interface TreeNode<T> {
//   data: T;
//   children?: TreeNode<T>[];
//   expanded?: boolean;
// }

// interface FSEntry {
//   ruangan: string;
//   lokasi: string;
//   kapasitas: string;
//   id:number;
// }

@Component({
  selector: "app-ruangan",
  templateUrl: "./ruangan.component.html",
  styleUrls: ["./ruangan.component.scss"],
})
export class RuanganComponent implements OnInit {
  // allColumns = ['id', 'ruangan', 'lokasi', 'kapasitas'];

  // data: TreeNode<FSEntry>[] = [{ data: { ruangan: 'null', lokasi: 'null', kapasitas: 'null',id: 0 } },{ data: { ruangan: 'null', lokasi: 'null', kapasitas: 'null',id: 0 } }];
  constructor(public us: RuanganService, private router: Router) {}
  ruangan: any = [];
  roleId: any = localStorage.getItem("role_id");
  ngOnInit() {
    console.log(this.roleId);
    this.us.getRuangan().subscribe(
      (data) => {
        this.ruangan = data["ruangan"];
        console.log(this.ruangan);
        // for(let items of data['ruangan'])
        // {
        //   this.data.push({ data: { ruangan: items['nama'], lokasi: items['lokasi'], kapasitas: items['kapasitas'],id: items['id'] } });
        // }
        // this.data = this.data.slice(); //solusi kalo hasil push tidak muncul pada html
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
    // console.log(this.data);
  }
  deleteRuangan(id) {
    this.us.deleteRuangan(id).subscribe(
      (data) => {
        console.log("Ruangan berhasil dihapus");
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
