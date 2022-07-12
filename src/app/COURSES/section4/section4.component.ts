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
  selector: "app-section4",
  templateUrl: "./section4.component.html",
  styleUrls: ["./section4.component.css"],
})
export class Section4Component implements OnInit {
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

  sectionFourHeader1: any = "";
  secFourcour_subhead1: any = "";
  secFourCour_details: any = "";
  secFourcour_img: any = "";

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
    this.apiService.getData("getCourseSection").subscribe(
      (data) => {
        const value = data.data;

        console.log("HOME ", this.homeContent);
        this.sectionFourHeader1 = value[0].PTwo_SecFour_TxtOne;
        this.secFourcour_subhead1 = value[0].PTwo_SecFour_TxtTwo;
        this.secFourCour_details = value[0].PTwo_SecFour_TxtThree;
        this.secFourcour_img = value[0].PTwo_SecFour_Img;

        this.courOneSummary = value[0].MoreFour_SecOne;
        this.courOneHead1 = value[0].MoreFour_SecTwo;
        this.firstsec = value[0].MoreFour_SecThree_Txt;
        this.certificateimg = value[0].MoreFour_SecThree_Img;

        this.thirdsec = value[0].MoreOne_SecTwo_ColThree;
        this.foursec = value[0].MoreOne_SecThree_Txt;

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateSecOne() {
    const value = {
      MoreOne_SecOne: this.courOneSummary,
      MoreOne_SecTwo_TxtOne: this.courOneHead1,
      MoreOne_SecTwo_ColOne: this.firstsec,
      MoreOne_SecTwo_ColTwo: this.secondsec,
      MoreOne_SecTwo_ColThree: this.thirdsec,
      MoreOne_SecThree_Txt: this.foursec,
      MoreOne_SecThree_Img: this.certificateimg,
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
      PTwo_SecFour_TxtOne: this.sectionFourHeader1,
      PTwo_SecFour_TxtTwo: this.secFourcour_subhead1,
      PTwo_SecFour_TxtThree: this.secFourCour_details,
      PTwo_SecFour_Img: this.secFourcour_img,

      MoreFour_SecOne: this.courOneSummary,
      MoreFour_SecTwo: this.courOneHead1,
      MoreFour_SecThree_Txt: this.firstsec,
      MoreFour_SecThree_Img: this.certificateimg,

      MoreOne_SecTwo_ColThree: this.thirdsec,
      MoreOne_SecThree_Txt: this.foursec,
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
      PTwo_SecFour_TxtOne: this.sectionFourHeader1,
      PTwo_SecFour_TxtTwo: this.secFourcour_subhead1,
      PTwo_SecFour_TxtThree: this.secFourCour_details,
      PTwo_SecFour_Img: this.secFourcour_img,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
}
