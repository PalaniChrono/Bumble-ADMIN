import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {
  modalBoxName;
  loadingBtn = false;
  loading = false;
  showPopup = false;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  disclaimer;
  disclaimerId;
  editDisclaimer;
  pincodeList : any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }
  ngOnInit() {
    this.listAllDisclaimer();
  }

  listAllDisclaimer(){
    this.loading = true;
    this.apiService.getData('getAllDisclaimerList').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

   store(){
    this.loadingBtn = true;
    const value = { disclaimer: this.disclaimer}
    this.apiService.postData(value, 'createDisclaimer').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllDisclaimer();
            this.disclaimer = '';
        
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

  updateDisclaimer() {
    
    this.loadingBtn = true;
    const value = { disclaimer_id: this.disclaimerId,disclaimer: this.editDisclaimer}
    this.apiService.postData(value, 'updateDisclaimer').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create';
            this.listAllDisclaimer();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    });
  }

  openModalBox(id = '', disclaimer='') {
    if (id) {
        this.modalBoxName = 'Edit';
        this.disclaimerId = id;
        this.editDisclaimer = disclaimer;
    } else {
        this.modalBoxName = 'Create';

    }
    this.showPopup = true;
  }

}
