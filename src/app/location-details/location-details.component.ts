import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  locationDetailsList:any = [];
  regionList: any;
  regionId: any;
  locationCode;
  locationName;
  pincode;
  mobileNo;
  address;

  editRegionId: any;
  editLocationCode;
  editLocationName;
  editPincode;
  editMobileNo;
  editAddress;
  locationDetailsId;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllLocationDetails();
    this.listAllRegions();
    this.search();
  }

  listAllLocationDetails(){
    this.loading = true;
    this.apiService.getData('getAllLocationDetails').subscribe((data) => {
        this.locationDetailsList = data.data;
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
    const value = { region_id: this.regionId, location_name: this.locationName, location_code: this.locationCode, address: this.address, pincode: this.pincode, mobile_no:this.mobileNo}
    this.apiService.postData(value, 'createLocationDetails').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllLocationDetails();
            this.regionId = '';
            this.locationCode = '';
            this.locationName = '';
            this.address = '';
            this.mobileNo='';
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

  activateRegion(location_details_id){
    console.log(location_details_id);
    this.loading = true;
    this.apiService.getData('activateLocationDetails', location_details_id).subscribe((data) => {
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

  deActivateRegion(location_details_id){
    this.loading = true;
    this.apiService.getData('deActivateLocationDetails', location_details_id).subscribe((data) => {
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
        text: 'You will not be able to recover this Location Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteLocationDetails', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllLocationDetails();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Region detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Location detail file is safe :)',
                'error'
            );
        }
    });
  }

  updateLocationDetails() {
  
    this.loadingBtn = true;
    const value = { location_details_id:this.locationDetailsId, region_id: this.editRegionId, location_name: this.editLocationName, location_code: this.editLocationCode, address: this.editAddress, pincode: this.editPincode, mobile_no:this.editMobileNo}
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

   openModalBox(id = '', region_id='', location_code='', location_name='', address='', pincode='', mobile_no = '') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.locationDetailsId = id;
        this.editRegionId = region_id;
        this.editLocationName = location_name;
        this.editLocationCode = location_code;
        this.editAddress = address;
        this.editPincode = pincode;
        this.editMobileNo = mobile_no;
    } else {
        this.modalBoxName = 'Create';
    }
    this.showPopup = true;
  }

  search() {
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
        this.apiService.searchData('searchLocationDetails', query)
    )).subscribe((result) => {
        if (this.searchField.value === '') {
            this.listAllLocationDetails();
            return false;
        }
        if (result.data.length === 0) {
            this.locationDetailsList = [];
        } else {
            this.locationDetailsList = result.data;
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
