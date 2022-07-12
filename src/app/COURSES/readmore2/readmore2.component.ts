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
  selector: "app-readmore2",
  templateUrl: "./readmore2.component.html",
  styleUrls: ["./readmore2.component.css"],
})
export class Readmore2Component implements OnInit {
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
    this.getcousesContent();
  }

  getcousesContent() {
    this.loading = true;
    this.apiService.getData("getCourseSection").subscribe(
      (data) => {
        const value = data.data;

        console.log("HOME ", this.homeContent);
        this.courOneSummary = value[0].MoreTwo_SecOne;
        this.courOneHead1 = value[0].MoreTwo_SecTwo_TxtOne;
        this.firstsec = value[0].MoreTwo_SecTwo_ColOne;
        this.secondsec = value[0].MoreTwo_SecTwo_ColTwo;
        this.thirdsec = value[0].MoreTwo_SecTwo_ColThree;
        this.foursec = value[0].MoreTwo_SecThree_Txt;
        this.certificateimg = value[0].MoreTwo_SecThree_Img;

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateSecOne() {
    const value = {
   
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
      MoreTwo_SecOne: this.courOneSummary,
      MoreTwo_SecTwo_TxtOne: this.courOneHead1,
      MoreTwo_SecTwo_ColOne: this.firstsec,
      MoreTwo_SecTwo_ColTwo: this.secondsec,
      MoreTwo_SecTwo_ColThree: this.thirdsec,
      MoreTwo_SecThree_Txt: this.foursec,
      MoreTwo_SecThree_Img: this.certificateimg,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
  updateSecthree() {
    const value = {
      // POne_SecThree_ImgFour: this.secthreeimg,
      // POne_SecThree_Txt: this.secthreeTxt,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
  updateSecfour() {
    const value = {
      // PTwo_SecFour_TxtOne: this.sectionFourHeader1,
      // PTwo_SecFour_TxtTwo: this.secFourcour_subhead1,
      // PTwo_SecFour_TxtThree: this.secFourCour_details,
      // PTwo_SecFour_Img: this.secFourcour_img,
    };
    this.apiCall("update", "updateCourseSectionOne", value);
  }
}
