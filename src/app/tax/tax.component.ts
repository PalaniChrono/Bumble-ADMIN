import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  taxPercentage;
  taxId;
  editTaxPercentage;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllTax();
  }

  listAllTax(){
    this.loading = true;
    this.apiService.getData('getAllTaxList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { tax_percentage: this.taxPercentage}
    this.apiService.postData(value, 'createTax').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllTax();
            this.taxPercentage = '';
        
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
    const value = { tax_id: this.taxId, tax_percentage: this.editTaxPercentage}
    this.apiService.postData(value, 'updateTax').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllTax();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', tax_percentage='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.taxId = id;
        this.editTaxPercentage = tax_percentage;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  activateRegion(tax_id){
    console.log(tax_id);
    this.loading = true;
    this.apiService.getData('activateTax', tax_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllTax();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(tax_id){
    this.loading = true;
    this.apiService.getData('deActivateTax', tax_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllTax();
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
        text: 'You will not be able to recover this Tax Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteTax', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllTax();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Tax detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Tax detail file is safe :)',
                'error'
            );
        }
    });
  }



}
