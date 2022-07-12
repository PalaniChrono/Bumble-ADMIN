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
  selector: "app-courses-section1",
  templateUrl: "./courses-section1.component.html",
  styleUrls: ["./courses-section1.component.css"],
})
export class CoursesSection1Component implements OnInit {
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
  sectiononeHeader1: any = "";
  seconecour_subhead1: any = "";
  secOneCour_subhead2: any = "";
  seconecour_subhead3: any = "";
  seconecour_img: any = "";
  secOneCour_details: any = "";
  sectwoimg: any = "";
  secthreeimg: any = "";
  secthreeTxt: any = "";
  secfourTxt: any = "";
  secfourimg: any = "";
  wedding_textcontent : any = "";
  all_textContent : any = ""

  // variable declarartion

  wed_portrait : any = ""
  wed_img_2 : any = ""
  wed_img_3 : any = ""
  wed_img_4 : any = ""
  wed_img_5 : any = ""
  wed_img_6 : any = ""
  wed_img_7 : any = ""
  wed_img_8 : any = ""
  wed_img_9 : any = ""
  wed_img_10 : any = ""
  wed_img_11 : any = ""
  wed_img_12 : any = ""

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
        this.wed_portrait = value[0].weddingpotrait
        this.wed_img_2  = value[0].wedding2
        this.wed_img_3  = value[0].wedding3
        this.wed_img_4  = value[0].wedding4
        this.wed_img_5  = value[0].wedding5
        this.wed_img_6  = value[0].wedding6
        this.wed_img_7  = value[0].wedding7
        this.wed_img_8  = value[0].wedding8
        this.wed_img_9  = value[0].wedding9
        this.wed_img_10  = value[0].wedding10
        this.wed_img_11  = value[0].wedding11
        this.wed_img_12  = value[0].wedding12
        this.wedding_textcontent = value[0].weddingtextcontent
        this.all_textContent = value[0].alltextcontent;



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
      weddingpotrait : this.wed_portrait,
         wedding2 : this.wed_img_2,
        wedding3  :  this.wed_img_3,
         wedding4 : this.wed_img_4,
        wedding5  :  this.wed_img_5,
         wedding6 : this.wed_img_6,
         wedding7  : this.wed_img_7,
         wedding8   : this.wed_img_8,
        wedding9  :  this.wed_img_9  ,
        wedding10 :  this.wed_img_10,
         wedding11 : this.wed_img_11,
        wedding12 :  this.wed_img_12 ,


    }
    this.apiCall("update","updateGallery",value)
  }
  updateweddingtext(){

    const value = {
      weddingtextcontent : this.wedding_textcontent,


    }
    this.apiCall("update","updateWeddingText",value)

  }
  updateallSectext(){
    const value = {
      alltextcontent : this.all_textContent,


    }
    this.apiCall("update","updateAllText",value)

  }
}
