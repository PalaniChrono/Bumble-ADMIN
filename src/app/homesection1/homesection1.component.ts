import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
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
  selector: "app-homesection1",
  templateUrl: "./homesection1.component.html",
  styleUrls: ["./homesection1.component.css"],
})
export class Homesection1Component implements OnInit {
  loading = false;
  loadingBtn = false;
  showPopup = false;

  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;

  productStocks: any = [];
  stockProductName = "";
  stockForm: FormGroup;

  defaultImage = "assets/images/loader.gif";

  @ViewChild("auto", { static: false }) auto;
  @ViewChild("auto", { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild("sizeDropDown", { static: false })
  sizeDropDown: AngularMultiSelect;
  @ViewChild("flavourDropDown", { static: false })
  flavourDropDown: AngularMultiSelect;

  banner_1: any = "";
  banner_2: any = "";
  banner_3: any = "";
  banner_4: any = "";

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getHomeBanner();
  }
  getHomeBanner() {
    this.loading = true;
    this.apiService.getData("getHomeBanner").subscribe(
      (data) => {
        const value = data.data;
        this.banner_1 = value[0].banner_1;
        this.banner_2 = value[0].banner_2;
        this.banner_3 = value[0].banner_3;
        this.banner_4 = value[0].banner_4;

        console.log("banner ", value);

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updatehomebanner() {
    const value = {
      banner_1: this.banner_1,
      banner_2: this.banner_2,
      banner_3: this.banner_3,
      banner_4: this.banner_4,
    };
    this.apiCall("update", "updatehomebanner", value);
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
      this.getHomeBanner();
    });
  }
}
