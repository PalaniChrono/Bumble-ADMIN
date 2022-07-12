import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent implements OnInit {
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  pincodeList : any = [];
  regionList: any = [];
  regionId: any;
  editRegionId: any;
  pincode;
  editPincode;
  rate;
  editRate;
  constructor(private apiService: ApiService, private toastr: ToastrService) { }
 

  ngOnInit() {
    this.listAllLocationDetails();
    this.listAllRegions();
    this.search();
  }

  listAllLocationDetails(){
    this.loading = true;
    this.apiService.getData('getAllPincode').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   listAllRegions(){
    this.loading = true;
    this.apiService.getData('getAllActiveRegionList').subscribe((data) => {
        this.regionList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { region_id: this.regionId, pincode: this.pincode, rate: this.rate}
    this.apiService.postData(value, 'createPincode').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllLocationDetails();
            this.regionId = '';
           this.rate='';
            this.pincode=''
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
  updatePincode() {
  
    this.loadingBtn = true;
    const value = { region_id: this.editRegionId, pincode: this.editPincode, rate: this.editRate}
    this.apiService.postData(value, 'updateLocationDetails').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllLocationDetails();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

   openModalBox(id = '', region_id='', pincode='', rate = '') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.editRegionId = region_id;
        this.editPincode = pincode;
        this.editRate = rate;
       
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  search() {
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
        this.apiService.searchData('searchPincode', query)
    )).subscribe((result) => {
        if (this.searchField.value === '') {
            this.listAllLocationDetails();
            return false;
        }
        if (result.data.length === 0) {
            this.pincodeList = [];
        } else {
            this.pincodeList = result.data;
        }
    });
  }


  activateRegion(pincode_id){
    console.log(pincode_id);
    this.loading = true;
    this.apiService.getData('activatePincode', pincode_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllLocationDetails();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(pincode_id){
    this.loading = true;
    this.apiService.getData('deActivatePincode', pincode_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllLocationDetails();
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
        text: 'You will not be able to recover this Pincode Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deletePincode', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllLocationDetails();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Pincode detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Pincode detail file is safe :)',
                'error'
            );
        }
    });
  }

  onChange(event){
    this.regionId = event;
    this.editRegionId = event;
    console.log(this.regionId);
   }

  popUpClose() {
    this.showPopup = false;
    this.errorMsg = [];
}

}
