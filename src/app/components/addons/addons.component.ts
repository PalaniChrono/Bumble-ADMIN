import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent implements OnInit {
  productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  regionName:any = 0;
  addonsList:any = [];
  taxId: any = 0;
  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  taxList: any = [];
  viewBox = false;
  showImage = true;
  imageUrl = '';
  productName;
  productPrice;
  editProductName;
  editProductPrice;
  addonsId;
  hsnCode:any = "";
  regionList: any = [];
  regionArray: any = [];
  regionId: any = [];
  editRegionId: any;
  editHsnCode:any = "";
  editTaxId:any = "";

  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAddonsList();  
  }

  getAddonsList() {
    this.loading = true;
    this.apiService.getData('getAddonsList').subscribe(data => {
        this.addonsList = data.data;
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

  openModalBox(type, id = '', name = '', price='', region_id='', hsn='', tax='') {
    this.listAllTax();
    this.listAllRegions();
    if(type === 'Edit') {
        this.modalBoxName = type;
        this.editProductName = name;
        this.editRegionId = region_id;
        this.editProductPrice = price;
        this.addonsId = id;
        this.editHsnCode = hsn;
        this.editTaxId = tax;
       
        this.showPopup = true;
    } else if (type === 'Create') {
        this.modalBoxName = 'Create';
        this.showPopup = true;
    }
  }

  popUpClose() {
    this.showPopup =  false;
    this.productName = '';
    this.productPrice = '';
}


  createAddons(){
    this.loading = true;

    const param = {
      product_name: this.productName,
      price: this.productPrice,
      hsn: this.hsnCode,
      tax_id: this.taxId,
      region_id : this.regionId      
    }

    this.apiService.postData(param, 'createAddons').subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.getAddonsList();
          this.popUpClose();
          this.loading = false;
      } else {
          this.toastr.warning(data.message);
          this.loading = false;
      }
    }, error => {
        this.loading = false;
    });
  }

  updateAddons(){
    this.loading = true;
      
    const param = {
      product_name: this.editProductName,
      price: this.editProductPrice,
      addon_id: this.addonsId,
      hsn: this.editHsnCode,
      tax_id: this.editTaxId,
      region_id : this.editRegionId   
      
    }

    this.apiService.postData(param, 'updateAddons').subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.getAddonsList();
          this.popUpClose();
          this.loading = false;
      } else {
          this.toastr.warning(data.message);
          this.loading = false;
      }
    }, error => {
        this.loading = false;
    });
  }

  listAllTax(){
    this.loading = true;
    this.apiService.getData('getAllActiveTaxList').subscribe((data) => {
        this.taxList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   onChange(event){
    this.regionId = event;
    this.editHsnCode = event;
    this.editRegionId = event;
   }
  deleteAddons(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Addons file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      }).then((result) => {
      if (result.value) {
          this.apiService.getData('deleteAddons', id).subscribe(data => {
          if (data.error === false) {
              this.toastr.success(data.message);
              this.sno = 1;
          } else {
              this.toastr.error(data.message);
          }
          this.getAddonsList();
          });
          Swal.fire(
          'Deleted!',
          'Your Addons file has been deleted.',
          'success'
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
          'Cancelled',
          'Your Addons file is safe :)',
          'error'
          );
      }
      });
  }


}
