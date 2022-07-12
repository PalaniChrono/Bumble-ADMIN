import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  categoryName: any;
  productName: any;
  productPrice: any;
  productDiscPrice: any;
  productDesc: any;
  productSize = '';
  productImages: any = [];
  editProductId: any;
  shortDescription;
  
  selectedSize: any = [];
  selectedFlavour:any = [];
  sizeSettings = {};
  flavourSettings = {};
  basePrice;
  categories: any = [];
  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;
  imageUrl = '';

  productStocks:any = [];
  stockProductName = '';
  stockForm: FormGroup;



  // sizeQuantity:any[] = [];

  defaultImage = 'assets/images/loader.gif';

  @ViewChild('auto', { static: false }) auto;
  @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
  @ViewChild('flavourDropDown', { static: false }) flavourDropDown: AngularMultiSelect;
  taxList: any = [];
  taxId: any = 0;
  newProduct: any = 1;
  bestSelling: any = 1;
  regionList: any = [];
  regionArray: any = [];
  regionId: any = [];

  flavourList: any = [];
  flavourArray: any = [];
  flavourId: any = [];
  description;
  variation:any = [];
  weightList: any = [];
  clickValue: any = 1;
  weightLength: any;
  startTime:any;
  endTime:any;
  hsn:any;
  preparation:any;
  unitList: any = [];
  unitId: any = 1;
  productId=this.route.snapshot.paramMap.get('id');
  categoryId: any;
  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }


  ngOnInit() {

    this.show(this.productId);

    this.sizeSettings = {
      singleSelection: false,
      text: 'Select Region',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
  };

  

  this.flavourSettings = {
    singleSelection: false,
    text: 'Select Flavour',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class'
  };
    
    this.getActiveCategory();
    this.listAllTax();
    this.listAllRegions();
    this.listAllFlavour();
    this.listAllWeight();
    this.listAllUnits();

  }
  listAllWeight(){
    this.loading = true;
    this.apiService.getData('getAllActiveWeightList').subscribe((data) => {
        this.weightList = data.data;
        this.weightLength = this.weightList.length;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   listAllUnits(){
    this.loading = true;
    this.apiService.getData('getAllActiveUnitList').subscribe((data) => {
        this.unitList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   
   removevalue(i) {
     this.variation.splice(i, 1);
   }
 
   addvalue() {
     this.clickValue = this.clickValue + 1;
    this.variation.push({ weight: '', egg: '', eggLess:'', sku:''});

    
     
   }

   onSubmit(){
     console.log(this.variation);

     console.log(this.startTime);
     console.log(this.endTime);
   }

  listAllRegions(){
    this.loading = true;
    this.apiService.getData('getAllActiveRegionList').subscribe((data) => {
        const regions = data.data;
        for (const region of regions) {
          this.regionList.push({ id: region.region_id, itemName: region.city.name });
      }
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

  getActiveCategory() {
    this.categories = [];
    this.loading = true;
    this.apiService.getData('getActiveSubCategory').subscribe(data => {
        const categories = data.data;
        for (const category of categories) {
            this.categories.push({ id: category.id,name: category.sub_category_name, category_id:category.category_id});
        }
        console.log(this.categories);
    });
  }

  listAllFlavour(){
    this.loading = true;
    this.apiService.getData('getAllActiveFlavourList').subscribe((data) => {
        //this.flavourList = data.data;

        const flavours = data.data;
        for (const flavour of flavours) {
          this.flavourList.push({ id: flavour.flavour_id, itemName: flavour.flavour_name });
      }
        this.loading = false;
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

  

  show(id) {
    this.apiService.show('product/' + id).subscribe((data) => {
        const value = data.data;
        this.editProductId = id;
        this.categoryName = value.category.category_name;
        this.categoryId = value.category_id;
        this.regionArray = value.region;
        this.flavourArray = value.flavour;
        this.productName = value.product_name;
        this.productPrice = value.product_price;
        this.productDiscPrice = value.product_discount_price;
        this.description = value.product_description;
        this.shortDescription = value.short_description;
        this.productImages = value.images;
        this.hsn = value.hsn;
        this.taxId = value.tax_id;
        this.startTime = value.start_time;
        this.endTime = value.end_time;
        this.newProduct = value.new_product;
        this.bestSelling = value.best_selling;
        this.unitId = value.unit_id;
        this.preparation = value.preparation;
        this.basePrice = value.product_price;

        this.onChangeUnit(this.unitId)

        value.variation.forEach(element => {
          this.variation.push({ weight: element.weight_id, egg: element.egg, eggLess:element.eggLess, sku: element.sku});
        });

        this.clickValue = this.variation.length;

        
    });
}

update(id) {
    this.loadingBtn = true;
    this.regionId = [];
    console.log(this.regionArray);
    this.regionArray.forEach(element => {
        this.regionId.push(element.id);
    });

    this.selectedSize= this.regionId.toString();

    this.flavourId = [];
    this.flavourArray.forEach(element => {
        this.flavourId.push(element.id);
    });
    this.selectedFlavour = this.flavourId.toString();
    this.apiCall('update', 'product/' + id);
}


  apiCall(name, url, value: any = '') {
    value = {
        product_id : this.productId,
        category_id : this.categoryId,
        product_name: this.productName,
        product_description: this.description,
        hsn:this.hsn,
        tax_id:this.taxId,
        start_time:this.startTime,
        end_time:this.endTime,
        preparation:this.preparation,
        new_product:this.newProduct,
        best_selling:this.bestSelling,
        unit_id:this.unitId,
        short_description:this.shortDescription,
        product_price:this.basePrice
        
    } 

    if(this.selectedSize.length) {
        value['region'] = this.selectedSize;
    }

    if(this.selectedFlavour.length){
      value['flavour'] = this.selectedFlavour;
    }
    if(this.variation.length){
      value['variation'] = this.variation;
    }

    this.apiService[name](url, value).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.loadingBtn = false;

            this.router.navigate(['products']);
          
        } else {
            this.toastr.error(data.message);
            this.loadingBtn = false;
            this.errorMsg = data.data;
        }
    });
  }

  onChangeTax(event){
    this.taxId = event;
  }
  onChangeUnit(event){
    this.unitId = event;

    this.apiService.getData('getAllActiveWeightListByUnitId', this.unitId).subscribe((data) => {
      this.weightList = data.data;
      this.weightLength = this.weightList.length;
      this.loading = false;

  }, error => {
      this.loading = false;
  });

  }
  onChangeNew(event){
    this.newProduct = event;
  }

  onChangeSelling(event){
    this.bestSelling = event;
  }

  onDeSelectAllSizes(event) {
    this.selectedSize = [];
    this.regionArray = [];
    this.regionId = [];
  }

  openSize(event) {
    this.sizeDropDown.openDropdown();
  }

  onDeSelectAllFlavour(event) {
    this.selectedFlavour = [];
    this.regionArray = [];
    this.regionId = [];
  }

  openFlavour(event) {
    this.flavourDropDown.openDropdown();
  }

  onFocused(e) {
    this.auto.close();
  }



}
