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
  selector: "app-section2",
  templateUrl: "./section2.component.html",
  styleUrls: ["./section2.component.css"],
})
export class Section2Component implements OnInit {
  productList: any = [];
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








  out_portrait : any = ""
  out_img_2 : any = ""
  out_img_3 : any = ""
  out_img_4 : any = ""
  out_img_5 : any = ""
  out_img_6 : any = ""
  out_img_7 : any = ""
  out_img_8 : any = ""
  out_img_9 : any = ""
  out_img_10 : any = ""
  out_img_11 : any = ""
  out_img_12 : any = ""
  outdoors_textcontent : any = ""

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getgallerycontent();
  }

  getgallerycontent() {
    this.loading = true;
    this.apiService.getData("getgallerycontent").subscribe(
      (data) => {
        const value = data.data;
        this.out_portrait  = value[0].outdoorportrait;
        this.out_img_2 = value[0].outdoor2;
        this.out_img_3 = value[0].outdoor3;
        this.out_img_4 = value[0].outdoor4;
        this.out_img_5 = value[0].outdoor5;

        this.out_img_6 = value[0].outdoor6;
        this.out_img_7 = value[0].outdoor7;
        this.out_img_8 = value[0].outdoor8;
        this.out_img_9 = value[0].outdoor9;
        this.out_img_10 = value[0].outdoor10;
        this.out_img_11 = value[0].outdoor11;
        this.out_img_12 = value[0].outdoor12;
        this.outdoors_textcontent = value[0].outdoorstextcontent;

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
      this.getgallerycontent();
    });
  }

  updateWeddingGallery(){
    const value = {
      outdoorportrait : this.out_portrait,
      outdoor2 : this.out_img_2,
      outdoor3  :  this.out_img_3,
      outdoor4 : this.out_img_4,
      outdoor5  :  this.out_img_5,
      outdoor6 : this.out_img_6,
      outdoor7  : this.out_img_7,
      outdoor8   : this.out_img_8,
      outdoor9  :  this.out_img_9  ,
      outdoor10 :  this.out_img_10,
      outdoor11 : this.out_img_11,
      outdoor12 :  this.out_img_12 ,


    }
    this.apiCall("update","updateGallery",value)
  }
  updateoutdoorstext(){

    const value = {
      outdoorstextcontent : this.outdoors_textcontent,


    }
    this.apiCall("update","updateOutdoorsText",value);
  }

  }
