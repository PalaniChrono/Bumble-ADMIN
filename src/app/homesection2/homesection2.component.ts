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
  selector: 'app-homesection2',
  templateUrl: './homesection2.component.html',
  styleUrls: ['./homesection2.component.css']
})
export class Homesection2Component implements OnInit {

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




  card1_img : any = ""
  card1_iconimg : any = ""
  home_card1_heading : any = ""
  home_card_1_textcontent : any = ""


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

       this.card1_img = value[0].home_card_1_img;
       this.card1_iconimg  = value[0].home_card_1_iconImg;
  this.home_card1_heading = value[0].home_card1_heading;
  this.home_card_1_textcontent = value[0].home_card_1_textcontent;
  this.loading = false;
  console.warn("this is data",data)
    }, error => {
        this.loading = false;
    });
   }
   updateHomeCard1() {
    const value = {

    home_card1_heading :this.home_card1_heading,
    home_card_1_textcontent : this.home_card_1_textcontent,
    };
    if (this.home_card_1_textcontent.length>340) {
      this.openPopup();



    }
    else{

      this.apiCall("update", "updateHomeCard1", value);
    }

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

closepopup(){
  this.show = false;
}
openPopup(){
  this.show = true;
}
}
