import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  customerName;
  customerMobile;
  customerEmail;
  address;

  customerDetailsId
  editCustomerName;
  editCustomerMobile;
  editCustomerEmail;
  editAddress;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllCustomerDetails();
  }

  listAllCustomerDetails(){
    this.loading = true;
    this.apiService.getData('getAllCustomerDetailsList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { customer_name: this.customerName, customer_mobile_no: this.customerMobile, customer_email: this.customerEmail, address: this.address}
    this.apiService.postData(value, 'createCustomerDetails').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllCustomerDetails();
            this.customerName = '';
            this.customerMobile = '';
            this.customerEmail = '';
            this.address = '';
            this.popUpClose();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    }, error => {
        this.loadingBtn = false;
    });
  }

    popUpClose() {
      this.showPopup = false;
      this.errorMsg = [];
  }

  updateCustomerDetails() {
    
    this.loadingBtn = true;
    const value = { customer_details_id:this.customerDetailsId,customer_name: this.editCustomerName, customer_mobile_no: this.editCustomerMobile, customer_email: this.editCustomerEmail, address: this.editAddress}
    this.apiService.postData(value, 'updateCustomerDetails').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllCustomerDetails();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', customer_name='',customer_mobile_no='',customer_email='',address='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.customerDetailsId = id;
        this.editCustomerEmail = customer_email;
        this.editCustomerName = customer_name;
        this.editCustomerMobile = customer_mobile_no;
        this.editAddress = address;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  deleteRegion(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Customer Details Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteCustomerDetails', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllCustomerDetails();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Customer Details detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Customer Details detail file is safe :)',
                'error'
            );
        }
    });
  }



}
