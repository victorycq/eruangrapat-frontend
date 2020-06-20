import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ERuangRapatService } from '../e-ruang-rapat.service';
import { NbDialogRef } from '@nebular/theme';
import { HomeComponent } from '../home/home.component'


@Component({
  selector: 'app-dialog-calender',
  templateUrl: './dialog-calender.component.html',
  styleUrls: ['./dialog-calender.component.scss']
})
export class DialogCalenderComponent implements OnInit {

  constructor(public us: ERuangRapatService, private router: Router, protected ref: NbDialogRef<HomeComponent>) { }
  jadwal: any
  detail: any[] = []
  currentPage: number = 0;
  currentDetail: any = {} as object;
  Previous:HTMLInputElement
  Next:HTMLInputElement
  ngOnInit() {
    this.Next = <HTMLInputElement>document.getElementById("Next")
    this.Previous = <HTMLInputElement>document.getElementById("Previous")
    this.us.getdetailtransaksi().subscribe(
      (data) => {
        for (var i = 0; i < data['rapat'].length; ++i) {
          var datatanggal = data['rapat'][i]['start']
          // var tanggal = datatanggal.substr(8, 2)
          var calender = datatanggal.split(" ")[0];
          if (calender == this.jadwal) {
            this.detail.push(data['rapat'][i]);
            this.detail.slice();
          }
        }

        this.currentDetail = this.detail[this.currentPage];
        if(this.detail.length > 1)
        {
          this.Next.disabled = false
        }
      },
      (error) => {

      })
  }
  next() {
    this.currentPage += 1;
    this.currentDetail = this.detail[this.currentPage];
    this.Previous.disabled = false;
    if (this.currentPage == this.detail.length-1) {
      this.Next.disabled = true;
    }
  }
  previous() {
    this.currentPage -= 1;
    this.currentDetail = this.detail[this.currentPage];
    this.Next.disabled = false;
    if(this.currentPage ==0)
    {
      this.Previous.disabled = true;
    }
  }
  close() {
    this.ref.close();
  }

}
