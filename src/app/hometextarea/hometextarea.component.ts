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
  selector: 'app-hometextarea',
  templateUrl: './hometextarea.component.html',
  styleUrls: ['./hometextarea.component.css']
})
export class HometextareaComponent implements OnInit {

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

  bigsizetext : any =""
  videourl : any = ""
  whoarewecontent : any = ""




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

  show: boolean = false;


  constructor(private apiService: ApiService, private toastr: ToastrService, public router: Router, private imageService: ImageService, private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.gethomecontent();


  }


  gethomecontent(){
    this.loading = true;
    this.apiService.getData('getHomeContent').subscribe((data) => {
        const value = data.data;
        this.bigsizetext = value[0].home_bigsizetext
        this.videourl = value[0].home_video_url
        this.whoarewecontent = value[0].home_whoarewe_text


  console.warn("this is data",data)
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
      this.gethomecontent();
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

updatehometextarea(){
  const value = {
    home_bigsizetext :  this.bigsizetext,
    home_video_url :  this.videourl ,
    home_whoarewe_text :  this.whoarewecontent,

  }
  if (this.whoarewecontent.length>555) {
    this.openPopup();

  }
  else{
    this.apiCall("update",'updateHometextarea',value)

  }

}
closepopup(){
  this.show = false;
}
openPopup(){
  this.show = true;
}
}
