import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
  providers: [DatePipe]
})
export class DiscountComponent implements OnInit {

  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  discountName;
  discountDate:any=[];
  editDiscountDate:any=[];
  editDiscountName;
  discountPercentage;
  discountId;
  editDiscountPercentage;;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllDiscount();
    console.log(new Date().toString());
  }

  listAllDiscount(){
    this.loading = true;
    this.apiService.getData('getAllDiscountList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }


   formatFromToDate(from, to) {
        return {
            fromDate: formatDate(new Date(from), 'yyyy-MM-dd', 'en'),
            toDate: formatDate(new Date(to), 'yyyy-MM-dd', 'en'),
            discount_name: this.discountName, 
            discount_percentage: this.discountPercentage,
        };
    }

    editFormatFromToDate(from, to) {
        return {
            fromDate: formatDate(new Date(from), 'yyyy-MM-dd', 'en'),
            toDate: formatDate(new Date(to), 'yyyy-MM-dd', 'en'),
            discount_id: this.discountId,
            discount_name: this.editDiscountName , 
            discount_percentage: this.editDiscountPercentage
        };
    }

   store(){
    this.loadingBtn = true;
   
    console.log(this.discountDate);
    const value = this.formatFromToDate(this.discountDate[0], this.discountDate[1]);

    this.apiService.postData(value, 'createDiscount').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllDiscount();
            this.discountPercentage = '';
        
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

  updateTax() {
    
    this.loadingBtn = true;
   
    const value = this.editFormatFromToDate(this.editDiscountDate[0], this.editDiscountDate[1]);
    this.apiService.postData(value, 'updateDiscount').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllDiscount();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '',discount_name ='', discount_percentage='', fromDate ='', toDate='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.discountId = id;
        this.editDiscountName = discount_name;
        this.editDiscountPercentage = discount_percentage;
        this.editDiscountDate = [formatDate(new Date(fromDate).toString(), 'MM-dd-yyyy', 'en'), formatDate(new Date(toDate).toString(), 'MM-dd-yyyy', 'en')];
        console.log(this.editDiscountDate);
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  activateRegion(discount_id){
    console.log(discount_id);
    this.loading = true;
    this.apiService.getData('activateDiscount', discount_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllDiscount();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(discount_id){
    this.loading = true;
    this.apiService.getData('deActivateDiscount', discount_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllDiscount();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deleteRegion(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Discount Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteDiscount', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllDiscount();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Discount detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your discount detail file is safe :)',
                'error'
            );
        }
    });
  }


}
