import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-customer-discount',
  templateUrl: './customer-discount.component.html',
  styleUrls: ['./customer-discount.component.css']
})
export class CustomerDiscountComponent implements OnInit {

  regionList: any = [];
  editDiscountId: any;
  customerDiscountId: string;

  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  loading = false;
  loadingBtn = false;
  discountList:any = [];
  regionArray: any = [];
  categoryArray: any = [];

  regionId: any = [];
  categoryId: any = [];
  modalBoxName = '';
  pincodeList:any = [];
  selectedSize: any = [];
  selectedCategory: any = [];

  sizeSettings = {};
  categorySettings = {};
  discountId;
  editRegionArray:any = [];
  categoryList:any = []

  editCategoryArray:any = [];

  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;

  @ViewChild('categoryDropDown', { static: false }) categoryDropDown: AngularMultiSelect;

  ngOnInit() {

    this.discountId = 0;
    this.sizeSettings = {
      singleSelection: false,
      text: 'Select Customer',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
   };

   this.categorySettings = {
    singleSelection: false,
    text: 'Select Category',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class'
 };
   this.getActiveCustomer();
   this.getActiveCategory();
   this.listAllCustomerDiscount();
   this.listAllDiscounts();
  }

  getActiveCategory(){
    this.loading = true;
    this.apiService.getData('getActiveCategory').subscribe((data) => {
      const regions = data.data;
        for (const region of regions) {
          this.categoryList.push({ id: region.id, itemName: region.category_name});
      }

        this.loading = false;
  }, error => {
      this.loading = false;
  });
  }


  getActiveCustomer(){
    this.loading = true;
    this.apiService.getData('getAllCustomerDetails').subscribe((data) => {
      const regions = data.data;
        for (const region of regions) {
          this.regionList.push({ id: region.customer_id, itemName: region.customer_name});
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

  listAllCustomerDiscount(){
    this.loading = true;
    this.apiService.getData('getAllDiscountCustomerList').subscribe((data) => {
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

    this.categoryArray.forEach(element => {
      this.categoryId.push(element.id);
    });

    this.selectedSize= this.regionId.toString();

    this.selectedCategory = this.categoryId.toString();

    const value = {
      category:this.selectedCategory,
      customer : this.selectedSize,
      discount_id: this.discountId
     }
    this.apiService.postData(value, 'createDiscountCustomer').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllCustomerDiscount();
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
    this.categoryId = [];

    this.editRegionArray.forEach(element => {
        this.regionId.push(element.id);
    });

    this.selectedSize= this.regionId.toString();

    this.editCategoryArray.forEach(element => {
      this.categoryId.push(element.id);
    });

  

    this.selectedCategory = this.categoryId.toString();

    const value = {
      category:this.selectedCategory,
      customer : this.selectedSize,
      discount_id: this.editDiscountId,
      customer_dis_id: this.customerDiscountId
    }
    this.apiService.postData(value, 'updateDiscountCustomer').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllCustomerDiscount();
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

  activateRegion(customer_discount_id){
    console.log(customer_discount_id);
    this.loading = true;
    this.apiService.getData('activateDiscountCustomer', customer_discount_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllCustomerDiscount();
        this.loadingBtn = false;
    } else {
        this.toastr.warning(data.message);
        this.loadingBtn = false;
    }
    }, error => {
        this.loading = false;
    });
  }

  deActivateRegion(customer_discount_id){
    this.loading = true;
    this.apiService.getData('deActivateDiscountCustomer', customer_discount_id).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.listAllCustomerDiscount();
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
        text: 'You will not be able to recover this Discount Customer Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteDiscountCustomer', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllCustomerDiscount();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Discount Customer has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Discount Customer detail file is safe :)',
                'error'
            );
        }
    });
  }

  openModalBox(id = '', discount_id='', customer={}, category={}) {
    if (id) {
        this.modalBoxName = 'Edit';
     
        this.customerDiscountId = id;
        this.editDiscountId = discount_id;
        this.editRegionArray = customer;
        this.editCategoryArray = category
       
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

  onDeSelectAllCategory(event) {
    this.selectedCategory = [];
    this.categoryArray = [];
    this.categoryId = [];
  }

  openSize(event) {
    this.sizeDropDown.openDropdown();
  }

  openCategory(event) {
    this.categoryDropDown.openDropdown();
  }


  onChange(event){
    this.discountId = event;
    this.editDiscountId = event;
   }




  popUpClose() {
      this.showPopup = false;
    
  }

}
