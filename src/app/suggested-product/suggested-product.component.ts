import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-suggested-product',
  templateUrl: './suggested-product.component.html',
  styleUrls: ['./suggested-product.component.css']
})
export class SuggestedProductComponent implements OnInit {
  regionList: any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  loading = false;
  loadingBtn = false;
 
  regionArray: any = [];
  regionId: any = [];
  modalBoxName = '';
  pincodeList:any = [];
  selectedSize: any = [];
  sizeSettings = {};
  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
  ngOnInit() {
    this.sizeSettings = {
      singleSelection: false,
      text: 'Select Suggested Product',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
   };
   this.getActiveProduct();
   this.listAllSuggestedProduct();
  }

  getActiveProduct(){
    this.loading = true;
    this.apiService.getData('getActiveProduct').subscribe((data) => {
      const regions = data.data;
        for (const region of regions) {
          this.regionList.push({ id: region.id, itemName: region.product_name});
      }
        this.loading = false;
  }, error => {
      this.loading = false;
  });
  }

  listAllSuggestedProduct(){
    this.loading = true;
    this.apiService.getData('getActiveSuggestedProduct').subscribe((data) => {
        this.pincodeList = data.data;
        const editRegions = data.data;
        for (const region of editRegions) {
          this.regionArray.push({ id: region.id, itemName: region.product_name});
        }


        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }


   store() {
    this.loadingBtn = true;
    this.regionId = [];
    console.log(this.regionArray);
    this.regionArray.forEach(element => {
        this.regionId.push(element.id);
    });

    this.selectedSize= this.regionId.toString();

    const value = {
      suggested : this.selectedSize
     }
    this.apiService.postData(value, 'storeSuggested').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllSuggestedProduct();
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

update() {
  this.loadingBtn = true;
  this.regionId = [];
  console.log(this.regionArray);
  this.regionArray.forEach(element => {
      this.regionId.push(element.id);
  });

  this.selectedSize= this.regionId.toString();

  const value = {
    suggested : this.selectedSize
   }
  this.apiService.postData(value, 'updateSuggested').subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.listAllSuggestedProduct();
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

// apiCall(name, url, value: any = '') {
//   value = name === 'storeSuggested' || name === 'update' ? {
     
      
//   } : value;

//   if(this.selectedSize.length) {
//       value['suggested'] = this.selectedSize;
//   }


//   this.apiService[name](url, value).subscribe((data) => {
//       if (data.error === false) {
//           this.toastr.success(data.message);
//           this.loadingBtn = false;
         
//       } else {
//           this.toastr.error(data.message);
//           this.loadingBtn = false;
//           this.errorMsg = data.data;
//       }
//   });
// }
   openModalBox(type) {
    if(type === 'Edit') {
        this.modalBoxName = type;
        this.showPopup = true;
    
    } else if (type === 'Create') {
        this.modalBoxName = 'Create';
        this.showPopup = true;
    }
}

onDeSelectAllSizes(event) {
  this.selectedSize = [];
  this.regionArray = [];
  this.regionId = [];
}

openSize(event) {
  this.sizeDropDown.openDropdown();
}




popUpClose() {
    this.showPopup = false;
   
}

}
