import { Component, OnInit } from "@angular/core";
import { ERuangRapatService } from "../e-ruang-rapat.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginError: boolean;

  constructor(public us: ERuangRapatService, private router: Router) {
    this.username = "";
    this.password = "";
    this.loginError = false;
  }

  ngOnInit() {
    if (localStorage.getItem("access_token")) {
      this.router.navigate(["/home"]);
    }
  }
  Authentication() {
    this.us.login(this.username, this.password).subscribe((data) => {
      if (data["token"] != false) {
        window.location.reload();
        this.router.navigate(["/home"]);
      } else {
        this.loginError = true;
      }
    });
  }
  onClose() {
    this.loginError = false;
  }

  token() {
    console.log(localStorage.getItem("access_token"));
  }
}
