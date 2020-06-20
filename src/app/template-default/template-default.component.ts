import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-template-default',
  templateUrl: './template-default.component.html',
  styleUrls: ['./template-default.component.scss']
})
export class TemplateDefaultComponent implements OnInit {
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
    {
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
    },
  ];
  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }
  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
