import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  countryList: any;
  countryName:any = "Select Country";
  countryId:any;
  stateList: any;
  stateName:any;
  cityName:any;
  stateId: any;
  cityList: any;
  cityId: any;
  address: any;
  regionList: any = [];
  sno = 1;
  editCountryId:any;
  editStateId:any;
  editCityId:any;
  editAddress:any;
  editRegionId:any;
  editCountryName;
  editStateName;
  editCityName;
  showState: boolean = false;
  showStateHide: boolean = true;

  showCity: boolean = false;
  showCityHide: boolean = true;



    constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllCountries();
    this.listAllRegions();
    this.countryName = 'select Country'
  }

  store(){
    this.loadingBtn = true;
    const value = { country_id: this.countryId, state_id: this.stateId, city_id: this.cityId, address: this.address}
    this.apiService.postData(value, 'createRegion').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllRegions();
            this.countryId = '';
            this.stateId = '';
            this.cityId = '';
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


  search() {
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
        this.apiService.searchData('searchRegion', query)
    )).subscribe((result) => {
        if (this.searchField.value === '') {
            this.listAllRegions();
            return false;
        }
        if (result.data.length === 0) {
            this.regionList = [];
        } else {
            this.regionList = result.data;
        }
    });
  }
  activateRegion(region_id){
    console.log(region_id);
    this.loading = true;
    this.apiService.getData('activateRegion', region_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllRegions();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(region_id){
    this.loading = true;
    this.apiService.getData('deActivateRegion', region_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllRegions();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }


  openModalBox(id = '', country_id='', state_id='', city_id='', address='', state_name='', city_name = '') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.onChange(country_id);
        this.onStateChange(state_id);

        this.editCountryId = country_id;
        this.editCityId = city_id;
        this.editStateId = state_id;
        this.editAddress = address;
        this.editRegionId = id;
        this.editCountryName = "country";
        this.editStateName = state_name;
        this.editCityName = city_name;
    } else {
        this.modalBoxName = 'Create';
        this.countryName = 'Select Country';
    }
    this.showPopup = true;
  }

  listAllCountries() {
    this.loading = true;
    this.apiService.getData('getCountryList').subscribe((data) => {
        this.countryList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
 }

 listAllRegions(){
  this.loading = true;
  this.apiService.getData('getAllRegionList').subscribe((data) => {
      this.regionList = data.data;
      this.loading = false;
  }, error => {
      this.loading = false;
  });
 }
 
 updateRegion() {
  
  this.loadingBtn = true;
  const value = { country_id: this.editCountryId, state_id: this.editStateId, city_id: this.editCityId, address: this.editAddress, region_id: this.editRegionId };
  this.apiService.postData(value, 'updateRegion').subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.popUpClose();
          this.modalBoxName = 'Create';
          this.listAllRegions();
          this.loadingBtn = false;
      } else {
          this.toastr.warning(data.message);
          this.loadingBtn = false;
      }
  });
}

 onChange(event){
  this.countryId = event;

  this.apiService.getData('getStateList', this.countryId).subscribe((data) => {
    this.stateList = data.data;
    this.loading = false;
    }, error => {
        this.loading = false;
    });
 }

 onStateChange(event){
  this.stateId = event;
  this.apiService.getData('getCityList', this.stateId).subscribe((data) => {
    this.cityList = data.data;
    this.loading = false;
    }, error => {
        this.loading = false;
    });
 }

 onCityChange(event){
  this.cityId = event;

  console.log(this.cityId);
 }

 showSelect(){
   this.showState = true;
   this.showStateHide = false;
 }

 showSelectCity(){
  this.showCity = true;
  this.showCityHide = false;
 }

 deleteRegion(id) {
  Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Region Detail',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
  }).then((result) => {
      if (result.value) {
          this.apiService.getData('deleteRegion', id).subscribe((data) => {
              if (data.error === false) {
                  this.toastr.success(data.message);
                  this.listAllRegions();
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
              'Your Region detail file is safe :)',
              'error'
          );
      }
  });
}

  popUpClose() {
      this.showPopup = false;
      this.errorMsg = [];
  }

}
