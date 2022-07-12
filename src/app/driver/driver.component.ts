import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  driverName;
  driverMobile;
  

  driverId
  editDriverName;
  editDriverMobile;
  
  pincodeList : any = [];
 locationList : any = [];


 locationDetailsId;
 editLocationDetailsId;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }


  ngOnInit() {
    this.listAllDriver();
    this.listAllLocationDetails();
  }

  listAllLocationDetails(){
    this.loading = true;
    this.apiService.getData('getAllActiveLocationDetails').subscribe((data) => {
        this.locationList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }


  listAllDriver(){
    this.loading = true;
    this.apiService.getData('getAllDriverList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { driver_name: this.driverName, driver_mobile: this.driverMobile, location_details_id:this.locationDetailsId}
    this.apiService.postData(value, 'createDriver').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllDriver();
            this.driverName = '';
            this.driverMobile = '';
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

  updateDriver() {
    
    this.loadingBtn = true;
    const value = { driver_id:this.driverId,driver_name: this.editDriverName, driver_mobile: this.editDriverMobile,location_details_id:this.editLocationDetailsId}
    this.apiService.postData(value, 'updateDriver').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllDriver();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', driver_name='',driver_mobile='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.driverId = id;
        this.editDriverName = driver_name;
        this.editDriverMobile = driver_mobile;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

  onChange(event){
    this.locationDetailsId = event;
    this.editLocationDetailsId = event;
   
   }

  deleteRegion(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Driver Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteDriver', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllDriver();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Driver detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Driver detail file is safe :)',
                'error'
            );
        }
    });
  }




}
