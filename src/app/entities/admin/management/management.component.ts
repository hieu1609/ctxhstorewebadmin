import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"]
})
export class ManagementComponent implements OnInit {
  flagDashboard: boolean = false;
  ChangeFlag() {
    this.flagDashboard = true;
  }
  ChangeFlagDash() {
    this.flagDashboard = false;
  }
  constructor(private _dataService: DataService, private router: Router) {}
  logOut() {
    const uri = "auth/logout";
    this._dataService.post(uri).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Logout successful!",

          showConfirmButton: false,
          timer: 1500
        });

        // localStorage.setItem("user", JSON.stringify(data));
        this.router.navigate([""]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  ngOnInit() {}
}
