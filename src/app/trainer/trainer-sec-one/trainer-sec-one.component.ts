import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { ImageService } from "src/app/services/image.service";
import Swal from "sweetalert2";
import { AngularMultiSelect } from "angular2-multiselect-dropdown";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-trainer-sec-one',
    templateUrl: './trainer-sec-one.component.html',
     styleUrls: ['./trainer-sec-one.component.css']
})
export class TrainerSecOneComponent implements OnInit {productList: any = [];

  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = "";
  keyword = "name";
  categoryName: any = 0;
  productName: any;
  productPrice: any;
  productDiscPrice: any;
  productDesc: any;
  productSize = "";
  productImages: any = [];
  editProductId: any;
  basePrice;
  shortDescription;

  selectedSize: any = [];
  selectedFlavour: any = [];
  sizeSettings = {};
  flavourSettings = {};

  categories: any = [];
  activeCategories: any = [];
  subCategories: any = [];
  subCategoryName: any;
  filteredSubCategories: any = [];
  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;
  imageUrl = "";

  productStocks: any = [];
  stockProductName = "";
  stockForm: FormGroup;



  // sizeQuantity:any[] = [];

  defaultImage = "assets/images/loader.gif";

  @ViewChild("auto", { static: false }) auto;
  @ViewChild("auto", { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild("sizeDropDown", { static: false })
  sizeDropDown: AngularMultiSelect;
  @ViewChild("flavourDropDown", { static: false })
  flavourDropDown: AngularMultiSelect;
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
  variation: any = [];
  weightList: any = [];
  clickValue: any = 1;
  weightLength: any;
  startTime: any;
  endTime: any;
  hsn: any = 0;
  preparation: any = 0;
  unitList: any = [];
  unitId: any = 0;
  baseEggPrice: any = "";
  baseEgglessPrice: any = "";
  filteredHsnCodeList: any = [];
  homeContent: any = "";
  sectiTwoHeader1: any = "";
  sectwocour_subhead1: any = "";
  secTwoCour_subhead2: any = "";

  secTwocour_img: any = "";
  secTwoCour_details: any = "";
  sectwoimg: any = "";
  secthreeimg: any = "";
  secthreeTxt: any = "";
  secfourTxt: any = "";
  secfourimg: any = "";

  courOneSummary: any = "";
  courOneHead1: any = "";
  firstsec: any = "";
  secondsec: any = "";
  thirdsec: any = "";
  foursec: any = "";
  certificateimg: any = "";








  baby_portrait : any = ""
  baby_img_2 : any = ""
  baby_img_3 : any = ""
  baby_img_4 : any = ""
  baby_img_5 : any = ""
  baby_img_6 : any = ""
  baby_img_7 : any = ""
  baby_img_8 : any = ""
  baby_img_9 : any = ""
  baby_img_10 : any = ""
  baby_img_11 : any = ""
  baby_img_12 : any = ""
  services1_textcontent : any = ""
  services2_textcontent : any = ""
  services3_textcontent : any = ""
  services4_textcontent : any = ""
  services5_textcontent : any = ""
  services6_textcontent : any = ""
  services7_textcontent : any = ""
  services8_textcontent : any = ""
  services9_textcontent : any = ""
  services10_textcontent : any = ""

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getservicescontent();
  }

  getservicescontent() {
    this.loading = true;
    this.apiService.getData("getServicescontent").subscribe(
      (data) => {
        const value = data.data;
        this.baby_portrait  = value[0].services1_img;
        this.baby_img_2 = value[0].services2_img;
        this.baby_img_3 = value[0].services3_img;
        this.baby_img_4 = value[0].services4_img;
        this.baby_img_5 = value[0].services5_img;

        this.baby_img_6 = value[0].services6_img;
        this.baby_img_7 = value[0].services7_img;
        this.baby_img_8 = value[0].services8_img;
        this.baby_img_9 = value[0].services9_img;
        this.baby_img_10 = value[0].services10_img;
        this.services1_textcontent = value[0].services1_text
        this.services2_textcontent = value[0].services2_text
        this.services3_textcontent = value[0].services3_text
        this.services4_textcontent = value[0].services4_text
        this.services5_textcontent = value[0].services5_text
        this.services6_textcontent = value[0].services6_text
        this.services7_textcontent = value[0].services7_text
        this.services8_textcontent = value[0].services8_text
        this.services9_textcontent = value[0].services9_text
        this.services10_textcontent = value[0].services10_text



        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }


  apiCall(name, url, value: any = "") {
    this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.loadingBtn = false;
      } else {
        this.toastr.error(data.message);
        this.loadingBtn = false;
        this.errorMsg = data.data;
      }
      this.getservicescontent();
    });
  }

  updateWeddingGallery(){
    const value = {
      babywashportrait : this.baby_portrait,
      babywash2 : this.baby_img_2,
      babywash3  :  this.baby_img_3,
      babywash4 : this.baby_img_4,
      babywash5  :  this.baby_img_5,
      babywash6 : this.baby_img_6,
      babywash7  : this.baby_img_7,
      babywash8   : this.baby_img_8,
      babywash9  :  this.baby_img_9  ,
      babywash10 :  this.baby_img_10,
      babywash11 : this.baby_img_11,
      babywash12 :  this.baby_img_12 ,


    }
    this.apiCall("update","updateGallery",value)
  }
  updateservicestext(){

    const value = {
     services1_text :   this.services1_textcontent,
      services2_text :  this.services2_textcontent,
      services3_text :  this.services3_textcontent ,
      services4_text :  this.services4_textcontent ,
      services5_text :  this.services5_textcontent,
     services6_text :   this.services6_textcontent,
      services7_text :  this.services7_textcontent ,
      services8_text :  this.services8_textcontent ,
       services9_text : this.services9_textcontent ,
      services10_text :  this.services10_textcontent



    }
    this.apiCall("update","updateServicestext",value);
  }

  }
