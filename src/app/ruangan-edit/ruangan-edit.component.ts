import { Component, OnInit } from '@angular/core';
import { RuanganService } from '../services/ruangan/ruangan.service';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface detailRuangan {
  nama:string;
  lokasi:string;
  opd:string;
  kapasitas:number;
  keterangan:string;
  koorX:string;
  koorY:string;
  contact:string;
}
export interface fasilitasRuangan {
  mejaPimpinan:number;
  podium:number;
  mejaPeserta:number;
  kursiPeserta:number;
  microphone:number;
  papanTulis:number;
  ruangTransit:number;
  ruangMakan:number;
  ac:number;
  lcdTv:number;
  projektor:number;
}

@Component({
  selector: 'app-ruangan-edit',
  templateUrl: './ruangan-edit.component.html',
  styleUrls: ['./ruangan-edit.component.scss']
})
export class RuanganEditComponent implements OnInit {

  constructor(public us:RuanganService, private router: Router, public route: ActivatedRoute,private fb: FormBuilder, private toastrService: NbToastrService) { }
  detailRuangan:detailRuangan = {
    nama:"",
    lokasi:"",
    opd:"",
    kapasitas:null,
    keterangan:"",
    koorX:"",
    koorY:"",
    contact:""
  }
  fasilitasRuangan:fasilitasRuangan = {
    mejaPimpinan:null,
    podium:null,
    mejaPeserta:null,
    kursiPeserta:null,
    microphone:null,
    papanTulis:null,
    ruangTransit:null,
    ruangMakan:null,
    ac:null,
    lcdTv:null,
    projektor:null,
  }
  checked = false;
  opd:any = {kodeSkpd:"0", namaSkpd:""};
  master_opd: any = [];
  ngOnInit() {

    this.us.getDetailRuangan(this.route.snapshot.params.id).subscribe(
      (data)=>{
        console.log(data);
        this.opd = {kodeSkpd:data['opd']['kode_skpd'], namaSkpd:data['opd']['nama_skpd']} 
        this.fasilitasRuangan = {
          mejaPimpinan:data['detailRuangan']['meja_pimpinan'],
          podium:data['detailRuangan']['podium'],
          mejaPeserta:data['detailRuangan']['meja_peserta'],
          kursiPeserta:data['detailRuangan']['kursi_peserta'],
          microphone:data['detailRuangan']['microphone'],
          papanTulis:data['detailRuangan']['papan_tulis'],
          ruangTransit:data['detailRuangan']['ruang_transit'],
          ruangMakan:data['detailRuangan']['ruang_makan'],
          ac:data['detailRuangan']['ac'],
          lcdTv:data['detailRuangan']['lcd_tv'],
          projektor:data['detailRuangan']['projektor'],
        }
        this.detailRuangan = {
          nama:data['detailRuangan']['nama'],
          lokasi:data['detailRuangan']['lokasi'],
          opd:data['detailRuangan']['opd'],
          kapasitas:data['detailRuangan']['kapasitas'],
          keterangan:data['detailRuangan']['keterangan'],
          koorX:data['detailRuangan']['koor_x'],
          koorY:data['detailRuangan']['koor_y'],
          contact:data['detailRuangan']['contact']
        }
        if(this.fasilitasRuangan.mejaPimpinan){
          
        }
        console.log(data['detailRuangan']);
      },
      (error)=>{

      }
    )
    this.us.getSKPD().subscribe(
      (data) => {
        console.log(this.opd);
        console.log(data);
        this.master_opd = data['SKPD']
        this.master_opd = this.master_opd.filter(obj => obj['nama_skpd']!== this.opd.namaSkpd);
      },
      (error) => {
        if (error['status'] = 401) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
        else {
          console.log(error['status']);
        }
      },
    )
  }  

  toggle(variable:string, checked: boolean) {
    if(variable == "mejaPimpinan"){
      if(checked == true)
      {
        this.fasilitasRuangan.mejaPimpinan = 1;
      }
      else
      {
        this.fasilitasRuangan.mejaPimpinan = null;
      }
    }
    else if(variable == "podium"){
      if(checked == true)
      {
        this.fasilitasRuangan.podium = 1;
      }
      else
      {
        this.fasilitasRuangan.podium = null;
      }
    }
    else if(variable == "ruangTransit"){
      if(checked == true)
      {
        this.fasilitasRuangan.ruangTransit = 1;
      }
      else
      {
        this.fasilitasRuangan.ruangTransit = null;
      }
    }
    else if(variable == "ruangMakan"){
      if(checked == true)
      {
        this.fasilitasRuangan.ruangMakan = 1;
      }
      else
      {
        this.fasilitasRuangan.ruangMakan = null;
      }
    }
  }
  editRuangan(position, status)
  {
    this.us.editRuangan(this.route.snapshot.params.id,this.detailRuangan, this.fasilitasRuangan).subscribe(
      (data)=>{
        console.log(data);
        this.toastrService.show(
          status || 'Success',
          `Ruangan Berhasil Di Edit`,
          { position, status });
      },
      (error)=>{
        if(error['status'] = 401)
        {
          // localStorage.clear();
          // this.router.navigate(['login']);
          console.log(error['status']);
        }
        else
        {
          console.log(error['status']);
        }
      },
    )
  }

}
