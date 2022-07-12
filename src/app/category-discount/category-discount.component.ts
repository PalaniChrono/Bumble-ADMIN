import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-discount',
  templateUrl: './category-discount.component.html',
  styleUrls: ['./category-discount.component.css']
})
export class CategoryDiscountComponent implements OnInit {

  regionList: any = [];
  editDiscountId: any;
  categoryDiscountId: string;

  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  loading = false;
  loadingBtn = false;
  discountList:any = [];
  regionArray: any = [];
  regionId: any = [];
  modalBoxName = '';
  pincodeList:any = [];
  selectedSize: any = [];
  sizeSettings = {};
  discountId;
  editRegionArray:any = [];
  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;


  ngOnInit() {
    this.discountId = 0;
    this.sizeSettings = {
      singleSelection: false,
      text: 'Select Category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
   };
   this.getActiveCategory();
   this.listAllCategoryDiscount();
   this.listAllDiscounts();

  }

  getActiveCategory(){
    this.loading = true;
    this.apiService.getData('getActiveCategory').subscribe((data) => {
      const regions = data.data;
        for (const region of regions) {
          this.regionList.push({ id: region.id, itemName: region.category_name});
      }

      


        this.loading = false;
  }, error => {
      this.loading = false;
  });
  }

  listAllDiscounts() {
    this.loading = true;
    this.apiService.getData('getAllActiveDiscountList').subscribe((data) => {
        this.discountList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
 }

  listAllCategoryDiscount(){
    this.loading = true;
    this.apiService.getData('getAllDiscountCategoryList').subscribe((data) => {
        this.pincodeList = data.data;
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
      category : this.selectedSize,
      discount_id: this.discountId
     }
    this.apiService.postData(value, 'createDiscountCategory').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllCategoryDiscount();
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
    this.editRegionArray.forEach(element => {
        this.regionId.push(element.id);
    });

    this.selectedSize= this.regionId.toString();

    const value = {
      category : this.selectedSize,
      discount_id: this.editDiscountId,
      category_discount_id: this.categoryDiscountId
    }
    this.apiService.postData(value, 'updateDiscountCategory').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllCategoryDiscount();
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

  activateRegion(category_discount_id){
    console.log(category_discount_id);
    this.loading = true;
    this.apiService.getData('activateDiscountCategory', category_discount_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllCategoryDiscount();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(category_discount_id){
    this.loading = true;
    this.apiService.getData('deActivateDiscountCategory', category_discount_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllCategoryDiscount();
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
        text: 'You will not be able to recover this Discount Category Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteDiscountCategory', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllCategoryDiscount();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Discount Category has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Discount Category detail file is safe :)',
                'error'
            );
        }
    });
  }

  openModalBox(id = '', discount_id='', category={}) {
    if (id) {
        this.modalBoxName = 'Edit';
     
        this.categoryDiscountId = id;
        this.editDiscountId = discount_id;
        this.editRegionArray = category;
       
    } else {
        this.modalBoxName = 'Create';

        this.selectedSize = [];
    this.regionArray = [];
    this.regionId = [];

    }
    this.showPopup = true;
  }

  onDeSelectAllSizes(event) {
    this.selectedSize = [];
    this.regionArray = [];
    this.regionId = [];
  }

  openSize(event) {
    this.sizeDropDown.openDropdown();
  }


  onChange(event){
    this.discountId = event;
    this.editDiscountId = event;
   }




  popUpClose() {
      this.showPopup = false;
    
  }

}
