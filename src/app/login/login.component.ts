import { Component, OnInit } from '@angular/core';
import { ERuangRapatService } from '../e-ruang-rapat.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public us:ERuangRapatService, private router: Router) { }

  username:string;
  password:string;

  ngOnInit() {
    if(localStorage.getItem('access_token'))
    {
      this.router.navigate(['/home'])
    }
  }
  Authentication()
  {
    this.us.login(this.username,this.password).subscribe((data) => {
      if(data['token'] != false)
      {
        window.location.reload()
        this.router.navigate(['/home'])
      }
      else
      {
        console.log("PASSWORD SALAH");
      }
    });
  }

  token()
  {
    console.log(localStorage.getItem("access_token"));
  }

}
