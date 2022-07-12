import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

 
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  privacyPolicy;
  privacyPolicyId;
  editPrivacyPolicy;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllPrivacyPolicy();
  }

  listAllPrivacyPolicy(){
    this.loading = true;
    this.apiService.getData('getAllPrivacyPolicyList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { privacy_policy: this.privacyPolicy}
    this.apiService.postData(value, 'createPrivacyPolicy').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllPrivacyPolicy();
            this.privacyPolicy = '';
        
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

  updatePrivacyPolicy() {
    
    this.loadingBtn = true;
    const value = { privacy_policy_id: this.privacyPolicyId,privacy_policy: this.editPrivacyPolicy}
    this.apiService.postData(value, 'updatePrivacyPolicy').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllPrivacyPolicy();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', privacy_policy='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.privacyPolicyId = id;
        this.editPrivacyPolicy = privacy_policy;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

}
