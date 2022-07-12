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
  selector: 'app-hayalashpolicies',
  templateUrl: './hayalashpolicies.component.html',
  styleUrls: ['./hayalashpolicies.component.css']
})
export class HayalashpoliciesComponent implements OnInit {
  coursepolicy:any = "";
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
  courOneSummary: any = "";
  courOneHead1: any = "";
  firstsec: any = "";
  secondsec: any = "";
  thirdsec: any = "";
  foursec: any = "";
  certificateimg: any = "";
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

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getcousesContent();
  }

  getcousesContent() {
    this.loading = true;
    this.apiService.getData("getCourseSection").subscribe(
      (data) => {
        const value = data.data;

        console.log("HOME ", this.homeContent);
        this.coursepolicy = value[0].PTwo_SecFive_Policy

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateSecOne() {
    const value = {
       
      
      PTwo_SecFive_Policy :  this.coursepolicy  
    };
    this.apiCall("update", "updateCourseSectionOne", value);
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
      this.getcousesContent();
    });
  }

  updateSecTwo() {
    const value = {
      // POne_SecTwo_Txt : this.sectwoTxt,
      POne_SecTwo_Img: this.sectwoimg,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
  updateSecthree() {
    const value = {
      POne_SecThree_ImgFour: this.secthreeimg,
      POne_SecThree_Txt: this.secthreeTxt,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
  updateSecfour() {
    const value = {
      POne_SecFour_Txt: this.secfourTxt,
      POne_SecFour_Img: this.secfourimg,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
}


 