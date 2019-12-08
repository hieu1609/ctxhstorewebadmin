import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-advertisement-management",
  templateUrl: "./advertisement-management.component.html",
  styleUrls: ["./advertisement-management.component.scss"]
})
export class AdvertisementManagementComponent implements OnInit {
  constructor(private _dataService: DataService, private router: Router) {}
  @ViewChild("formAddAds", { static: false }) formAddAds: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  adsList: any = [];
  idAdsEdit;
  totalPage: any = [];
  currentPage;
  ngOnInit() {
    this.getAllAds(1);
  }
  ShowImg(item) {
    Swal.fire({
      title: item.title,
      imageUrl: item.image,
      imageWidth: 1000,
      imageHeight: 450,
      imageAlt: "Custom image",
      showConfirmButton: false
    });
  }
  getAllAds(page) {
    this.currentPage = page;
    const uri = `admin/getSlideShowAdmin`;
    let message = {
      page
    };
    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.adsList = data.data.data;
        if (this.adsList.length === 0 && page !== 1) {
          this.getAllAds(page - 1);
        }
        let i = 1;
        this.totalPage = [];
        while (i <= data.data.numPage) {
          this.totalPage.push(i);
          i++;
        }
      },
      (err: any) => {}
    );
  }
  EditAds(item) {
    this.idAdsEdit = item.id;
    this.formEdit.setValue({
      title: item.title,
      image: item.image
    });
  }
  _handleOnSubmitEditForm() {
    const uri = `admin/slideshow/${this.idAdsEdit}`;
    this._dataService.put(uri, this.formEdit.value).subscribe(
      (data: any) => {
        this.getAllAds(this.currentPage);
        Swal.fire({
          icon: "success",
          title: "Update successful!",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (err: any) => {}
    );
  }
  DeleteAds(item) {
    this.idAdsEdit = item.id;
    const uri = `admin/slideshow/${this.idAdsEdit}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllAds(this.currentPage);
        Swal.fire({
          icon: "success",
          title: "Delete successful!",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (err: any) => {}
    );
  }
  _handleOnSubmitAddForm() {
    const uri = "admin/addSlideShow";
    this._dataService.post(uri, this.formAddAds.value).subscribe(
      (data: any) => {
        this.getAllAds(this.currentPage);
        this.formAddAds.resetForm();
        Swal.fire({
          icon: "success",
          title: "Add new ads successful!",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (err: any) => {}
    );
  }
}
