import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-completed-order",
  templateUrl: "./completed-order.component.html",
  styleUrls: ["./completed-order.component.scss"]
})
export class CompletedOrderComponent implements OnInit {
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  ordertList: any = [];
  productsList: any = [];
  idProductEdit;
  totalPage: any = [];
  orderID;
  currentPage;
  times = 1;
  editflag: boolean = false;
  editOrderObj: any = {
    id: 0,
    orderId: 0,
    productId: 0,
    productNumber: 0,
    confirm: false,
    shipping: false,
    success: false,
    name: "",
    phone: "",
    address: "",
    email: "",
    userId: null
  };
  ngOnInit() {
    this.getAllOrder(1);

    if (sessionStorage.getItem("productsList")) {
      this.productsList = JSON.parse(sessionStorage.getItem("productsList"));
    }
  }

  getAllProduct() {
    const uri = `admin/getAllProductAdmin`;

    this._dataService.get(uri).subscribe(
      (data: any) => {
        for (let item of data.data) {
          this.productsList.push(item);
        }
        sessionStorage.setItem(
          "productsList",
          JSON.stringify(this.productsList)
        );

        console.log(this.productsList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getAllOrder(page) {
    const uri = `admin/getPurchasesCompletedAdmin`;
    let message = {
      page
    };
    this.currentPage = page;

    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.ordertList = data.data.data;

        if (this.ordertList.length === 0 && page !== 1) {
          this.getAllOrder(page - 1);
        }

        let i = 1;
        this.totalPage = [];
        while (i <= data.data.numPage) {
          this.totalPage.push(i);
          i++;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  DeleteOrder(id) {
    console.log(id);
    const uri = `admin/order/${id}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllOrder(this.currentPage);
        Swal.fire({
          icon: "success",
          title: "Delete successful!",

          showConfirmButton: false,
          timer: 1500
        });
      },
      (err: any) => {
        alert(err.error.errors[0].errorMessage);
      }
    );
  }
  EditProduct(item) {
    console.log(item);

    this.orderID = item.order_id;
    this.idProductEdit = item.id;

    this.formEdit.setValue({
      name: item.name,
      phone: item.phone,
      email: item.email,
      address: item.address,
      product_name: item.product_name,
      productNumber: item.product_number,
      price: item.product_price
    });
    this.editflag = true;
    console.log(this.formEdit.value);

    this.editOrderObj.id = item.id;
    this.editOrderObj.orderId = item.order_id;
    this.editOrderObj.productId = item.product_id;
    this.editOrderObj.userId = item.user;
  }
}
