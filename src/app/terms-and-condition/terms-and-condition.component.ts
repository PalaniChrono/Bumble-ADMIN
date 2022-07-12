import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})



export class TermsAndConditionComponent implements OnInit{


  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  termsAndCondition;
  termsId;
  editTermsAndCondition;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }


  ngOnInit() {
    this.listAllTermsAndCondition();
  }

  listAllTermsAndCondition(){
    this.loading = true;
    this.apiService.getData('getAllTermsAndConditionList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { terms_and_condition: this.termsAndCondition}
    this.apiService.postData(value, 'createTermsAndCondition').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllTermsAndCondition();
            this.termsAndCondition = '';
        
            this.popUpClose();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    }, error => {
        this.loadingBtn = false;
    });
  }

    popUpClose() {
      this.showPopup = false;
      this.errorMsg = [];
  }

  updateTermsAndCondition() {
    
    this.loadingBtn = true;
    const value = { terms_id: this.termsId,terms_and_condition: this.editTermsAndCondition}
    this.apiService.postData(value, 'updateTermsAndCondition').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllTermsAndCondition();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', terms_and_condition='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.termsId = id;
        this.editTermsAndCondition = terms_and_condition;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

}
