import { Component, OnInit } from '@angular/core';
import { ERuangRapatService } from '../e-ruang-rapat.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public us:ERuangRapatService, private router: Router) { }
  username:string;
  password:string;
  email:string;
  role_id:string;
  opd:string;
  ngOnInit() {
  }
  Register(){
    this.us.register(this.username,this.password,this.email,this.role_id, this.opd).subscribe((data)=>{
      if(data['token'] != false)
      {
        this.router.navigate(['/home'])
      }
      else
      {
        console.log("register gagal");
      }
    });
  }

}
