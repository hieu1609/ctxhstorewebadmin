import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-admin",
  templateUrl: "./login-admin.component.html",
  styleUrls: ["./login-admin.component.scss"]
})
export class LoginAdminComponent implements OnInit {
  @ViewChild("formSignIn", { static: false }) formSignIn: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  ngOnInit() {}
  _handleOnSubmit() {
    const uri = "auth/login";
    if (this.formSignIn.valid) console.log(this.formSignIn.value);

    this._dataService.post(uri, this.formSignIn.value).subscribe(
      (data: any) => {
        // if(data.data.)
        console.log(data.data.user.admin == 1);
        if (data.data.user.admin == 1) {
          Swal.fire({
            icon: "success",
            title: "Successful",
            showConfirmButton: false,
            timer: 1500
          });
          sessionStorage.setItem("admin", JSON.stringify(data));

          this.router.navigate(["dashboard"]);
        } else {
          Swal.fire({
            icon: "error",
            title: "You don't have the access permissions",
            showConfirmButton: true
          });
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
