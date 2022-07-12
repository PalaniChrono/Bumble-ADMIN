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
  selector: 'app-other-courses-section2',
  templateUrl: './other-courses-section2.component.html',
  styleUrls: ['./other-courses-section2.component.css']
})
export class OtherCoursesSection2Component implements OnInit {


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

  sectiThreeHeader1: any = "";
  secthreecour_subhead1: any = "";

  secThreeCour_details: any = "";
  secThreecour_img: any = "";

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
    this.getcoursesContent();
  }

  getcoursesContent() {
    this.loading = true;
    this.apiService.getData("getOtherCourseSection").subscribe(
      (data) => {
        const value = data.data;

        console.log("HOME ", this.homeContent);
        this.sectiThreeHeader1 = value[0].PTwo_SecThree_TxtOne;
        this.secthreecour_subhead1 = value[0].PTwo_SecThree_TxtTwo;
        this.secThreeCour_details = value[0].PTwo_SecThree_TxtThree;
        this.secThreecour_img = value[0].PTwo_SecThree_Img;
        this.courOneSummary = value[0].MoreThree_SecOne;
        this.courOneHead1 = value[0].MoreThree_SecTwo;
        this.firstsec = value[0].MoreThree_SecThree_Txt;
        this.certificateimg = value[0].MoreThree_SecThree_Img;

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateSecOne() {
    const value = {
      // POne_SecOne_TxtOne : this.sectionOneGreyText,
      // POne_SecOne_TxtTwo : this.features ,
      POne_SecOne_Img: "",
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
      this.getcoursesContent();
    });
  }

  updateSecTwo() {
    const value = {
      PTwo_SecThree_TxtOne: this.sectiThreeHeader1,
      PTwo_SecThree_TxtTwo: this.secthreecour_subhead1,
      PTwo_SecThree_TxtThree: this.secThreeCour_details,
      PTwo_SecThree_Img: this.secThreecour_img,
      MoreThree_SecOne: this.courOneSummary,
      MoreThree_SecTwo: this.courOneHead1,
      MoreThree_SecThree_Txt: this.firstsec,
      MoreThree_SecThree_Img: this.certificateimg,
    };
    this.apiCall("update", "updateOtherCourseSectionTwo", value);
  }
  updateSecthree() {
    const value = {
      PTwo_SecThree_TxtOne: this.sectiThreeHeader1,
      PTwo_SecThree_TxtTwo: this.secthreecour_subhead1,
      PTwo_SecThree_TxtThree: this.secThreeCour_details,
      PTwo_SecThree_Img: this.secThreecour_img,
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

