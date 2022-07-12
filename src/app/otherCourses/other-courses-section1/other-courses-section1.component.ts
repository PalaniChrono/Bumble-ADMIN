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
  selector: 'app-other-courses-section1',
  templateUrl: './other-courses-section1.component.html',
  styleUrls: ['./other-courses-section1.component.css']
})
export class OtherCoursesSection1Component implements OnInit {
 viewBox = false;
 errorMsg: any = [];
  loading = false;
  loadingBtn = false;
  orderDetails : any = ''
  p = 1;

  defaultImage = "assets/images/loader.gif";

  @ViewChild("auto", { static: false }) auto;
  @ViewChild("auto", { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild("sizeDropDown", { static: false })
  sizeDropDown: AngularMultiSelect;
  @ViewChild("flavourDropDown", { static: false })
  flavourDropDown: AngularMultiSelect;


  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.getOtherCousesContent();
    this. listAllTestimony();
  }

  getOtherCousesContent() {
    this.loading = true;
    this.apiService.getData("getOtherCourseSection").subscribe(
      (data) => {
        const value = data.data;



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
      this.getOtherCousesContent();
    });
  }




  listAllTestimony() {
    this.loading = true;
    this.apiService.getData('getcareers').subscribe((data) => {
        this.orderDetails = data.data;


        this.loading = false;
        }, error => {
        this.loading = false;
    });
}
}

