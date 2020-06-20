import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../services/masterData/master-data.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';//

export interface skpd {
  kode: string,
  nama: string,
  jumlahLevel: number,
  nipKepalaSkpd: string,
  namaKepalaSkpd:string,
  pangkatKepalaSkpd: string,
  jabatanKepalaSkpd: string,
  nipBendahara: string,
  namaBendahara: string,
  pangkatBendahara: string,
  jabatanBendahara: string,
}

@Component({
  selector: 'app-skpd-tambah',
  templateUrl: './skpd-tambah.component.html',
  styleUrls: ['./skpd-tambah.component.scss']
})
export class SkpdTambahComponent implements OnInit {

  constructor(public us: MasterDataService, private router: Router, public route: ActivatedRoute) { }
  skpd: skpd = {} as skpd;
  pegawai: any = [];
  bendahara:string;
  kepalaSkpd:string;
  ngOnInit() {
    this.us.getAll().subscribe(
      (data) => {
        for (let pegawai of data['pegawai']) {
          this.pegawai.push(pegawai['nip18'] + " - " + pegawai['nama']);
        }
        this.pegawai.slice();
        console.log(this.pegawai);
      },
      (error) => {
        localStorage.clear();
        this.router.navigate(['/login']);

      }
    )
  }
  searchPegawai = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.pegawai.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )
    storeSkpd()
    {
      this.skpd.nipKepalaSkpd = this.kepalaSkpd.split(" - ")[0]; 
      this.skpd.namaKepalaSkpd = this.kepalaSkpd.split(" - ")[1];
      this.skpd.nipBendahara = this.bendahara.split(" - ")[0]; 
      this.skpd.namaBendahara = this.bendahara.split(" - ")[1]; 
      this.us.storeSkpd(this.skpd).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
        }
      )
    }

}
