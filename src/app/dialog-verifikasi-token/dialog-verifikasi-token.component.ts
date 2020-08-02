import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RapatService } from "../services/rapat/rapat.service";
import { NbDialogRef } from "@nebular/theme";
import { RapatDetailComponent } from "../rapat-detail/rapat-detail.component";

@Component({
  selector: "app-dialog-verifikasi-token",
  templateUrl: "./dialog-verifikasi-token.component.html",
  styleUrls: ["./dialog-verifikasi-token.component.scss"],
})
export class DialogVerifikasiTokenComponent implements OnInit {
  constructor(
    public us: RapatService,
    private router: Router,
    protected ref: NbDialogRef<RapatDetailComponent>
  ) {}
  token: string;
  showError: boolean = false;
  ngOnInit() {}
  verifikasiToken() {
    this.showError = false;
    if (this.token == localStorage.getItem("verifikasiToken")) {
      this.ref.close();
      this.router.navigate(["/editRapat/" + localStorage.getItem("idRapat")]);
    } else {
      this.showError = true;
      console.log(localStorage.getItem("verifikasiToken"));
    }
  }
  cancel() {
    this.ref.close();
  }
}
