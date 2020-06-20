import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { ERuangRapatService } from '../app/e-ruang-rapat.service';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrondEnd';
  status='';
  username = true;
  items = [
    {
      title: 'Halaman Utama',
      icon: 'home-outline',
      link: ['/home'],
    },
    {
      title: 'Daftar Ruangan',
      icon: 'pin-outline',
      link: ['/ruangan'],
    },
    {
      title: 'Daftar Rapat',
      icon: 'message-square-outline',
      link: ['/rapat'],
    },
    {
      title: 'Daftar Permohonan',
      icon: 'email-outline',
      link: ['/permohonan'],
    },
  ];

  itemAdmin =  {
      title: 'Master Data',
      icon:'archive-outline',
      expanded: false,
      children: [
        {
          title: 'Pegawai',
          link: ['/pegawai'],
        },
        {
          title: 'SKPD',
          link: ['/skpd'],
        },
      ],
    }
  constructor(public us:ERuangRapatService,public route: ActivatedRoute, private router: Router, private sidebarService: NbSidebarService) { }
  currentRoute:any
  ngOnInit() {
    this.status = localStorage.getItem('access_token');
    if(localStorage.getItem('role_id') == "5")
    {
      this.items.splice(4,1)
      console.log(this.items);
    }
    else{
      this.items.push(this.itemAdmin as any);
      this.items.slice();
    }
  }
  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  logout() {
    this.us.logout().subscribe((data)=>{
      if(data["sukses"])
      {
        console.log(data);
        this.status = '';
        this.router.navigate(['login'])       
        this.ngOnInit();
      }
    });
  }
}
