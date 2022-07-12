import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  categoryName: any = 0;
  productName: any;
  productPrice: any;
  productDiscPrice: any;
  productDesc: any;
  productSize = '';
  productImages: any = [];
  editProductId: any;
  basePrice;
  shortDescription;

  
  selectedSize: any = [];
  selectedFlavour:any = [];
  sizeSettings = {};
  flavourSettings = {};

  categories: any = [];
  activeCategories: any = [];
  subCategories:any = [];
  subCategoryName:any ;
  filteredSubCategories:any=[];
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
  hsn:any = 0;
  preparation:any = 0;
  unitList: any = [];
  unitId: any = 0;
  baseEggPrice:any = ''
  baseEgglessPrice:any = ''
  filteredHsnCodeList:any = [];
  homeContent:any="";
  sectionOneGreyText:any = "";
  features:any = "";
  seconeimg:any = "";
  sectwoTxt:any = "";
  sectwoimg:any = "";
  secthreeimg:any = "";
  secthreeTxt:any ="";
  secfourTxt:any = "";
  secfourimg:any = "";
  
  

  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, private imageService: ImageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  
  
    this.getHomeContent();

       
  }


  getHomeContent(){
    this.loading = true;
    this.apiService.getData('getHomeSection').subscribe((data) => {
        const value = data.data;
     
        console.log("HOME ",this.homeContent);
        this.sectionOneGreyText = value[0].POne_SecOne_TxtOne;
        this.features = value[0].POne_SecOne_TxtTwo; 
        this.seconeimg = value[0].POne_SecOne_Img;
        this.sectwoTxt = value[0].POne_SecTwo_Txt;
        this.sectwoimg = value[0].POne_SecTwo_Img;
        this.secthreeTxt = value[0].POne_SecThree_Txt;
        this.secthreeimg = value[0].POne_SecThree_ImgFour;
        this.secfourTxt =  value[0].POne_SecFour_Txt;
        this.secfourimg = value[0].POne_SecFour_Img;
      
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }
  
updateSecOne(){
  const value = {
    POne_SecOne_TxtOne : this.sectionOneGreyText,
    POne_SecOne_TxtTwo : this.features ,
    POne_SecOne_Img : ""
      
  }  
  this.apiCall('update', 'updateHomeSectionOne',value);

}
apiCall(name, url, value: any = '') {

  this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
          this.toastr.success(data.message);
          this.loadingBtn = false;
      } else {
          this.toastr.error(data.message);
          this.loadingBtn = false;
          this.errorMsg = data.data;
      }
      this.getHomeContent();
  });
}

updateSecTwo(){
  const value = {
    POne_SecTwo_Txt : this.sectwoTxt,
    POne_SecTwo_Img :  this.sectwoimg 
  } 
  this.apiCall('update', 'updateHomeSectionOne',value);
 
}
updateSecthree(){
  const value = {
    POne_SecThree_ImgFour :this.secthreeimg,
    POne_SecThree_Txt:    this.secthreeTxt
  } 
  this.apiCall('update', 'updateHomeSectionOne',value);
 
}
updateSecfour(){
  const value = {
    
    POne_SecFour_Txt :this.secfourTxt,
    POne_SecFour_Img: this.secfourimg
  } 
  this.apiCall('update', 'updateHomeSectionOne',value);
 
}



}
