import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  p = 1;
    show = false;
    userList: any = [];
    modalBoxName;
    isActive = false;
    isActiveCon = false;
    allBranchlist = [];
    keyword = 'name';
    userName;
    userEmail;
    password;
    conPassword;
    editUserId;
    editUserName;
    editUserEmail;
    editUserPassword;
    loading = false;
    errorMsg: any = [];
    loadingBtn = false;

    locationDetailsId;
    editLocationDetailsId;
    searchField: FormControl = new FormControl();
  pincodeList: any = [];
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllUsers();
    this.searchUser();
    this.listAllLocationDetails();
  }

  listAllLocationDetails(){
    this.loading = true;
    this.apiService.getData('getAllActiveLocationDetails').subscribe((data) => {
        this.pincodeList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
   }

  listAllUsers() {
    this.loading = true;
    this.apiService.getData('dispatch').subscribe(data => {
        this.userList = data.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
}



createUser() {
    this.loadingBtn = true;
    const value = {
        dispatch_name: this.userName,
        password: this.password,
        c_password: this.conPassword,
        location_details_id:this.locationDetailsId
    };
    console.log(value);
    this.apiService.store('dispatch', value).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllUsers();
            this.password = '';
            this.userName = '';
            this.conPassword = '';
            this.popUpClose();
            this.loadingBtn = false;
        } else {
            this.toastr.error(data.message);
            this.errorMsg = data.data;
            console.log(data);
            setTimeout(() => {
                this.errorMsg = [];
            }, 3500);
            this.loadingBtn = false;
        }
    }, error => {
        this.loadingBtn = false;
    });
}

updateUser() {
    if (!this.editUserName) {
        this.toastr.error('Missing the mandatory params to update');
        return false;
    }
    this.loadingBtn = true;
    const value = {
        disispatch_team_id: this.editUserId,
        dispatch_name: this.editUserName,
        password: this.editUserPassword,
        location_details_id: this.editLocationDetailsId
    };
    this.apiService.update('dispatch/'+ this.editUserId, value).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create User';
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
        this.listAllUsers();
    }, error => {
        this.loadingBtn = false;
    });
}

dispatchSwitch(id) {
    this.apiService.getData('dispatchSwitch', id).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllUsers();
        } else {
            this.toastr.error(data.message);
        }
    });
}

onChange(event){
  this.locationDetailsId = event;
  this.editLocationDetailsId = event;
 
 }

searchUser() {
    this.searchField.valueChanges
        .pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchTag', query)
        ))
        .subscribe((result) => {
            if (this.searchField.value === '') {
                this.listAllUsers();
                return false;
            }
            if (result.data.length === 0) {
                this.userList = '';
            } else {
                this.userList = result.data;
            }
        });
}

passwordVisible() {
    this.isActive = true;
}

passwordinVisible() {
    this.isActive = false;
}

conPasswordVisible() {
    this.isActiveCon = true;
}

conPasswordinVisible() {
    this.isActiveCon = false;
}

openModalBox(id = '', name = '', location_details_id = '') {
    this.show = true;
    if (name) {
        this.modalBoxName = 'Edit User';
        this.editUserId = id;
        this.editUserName = name;
        this.editLocationDetailsId = location_details_id;
        this.editUserPassword = '';
    } else {
        this.modalBoxName = 'Create User';
        this.password = '';
        this.userName = '';
        this.userEmail = '';
        this.conPassword = '';
    }
}
popUpClose() {
    this.show = false;
}

deleteUser(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this User file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.destroy('dispatch/'+id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.listAllUsers();
                } else {
                    this.toastr.error(data.message);
                }
            });
            Swal.fire(
                'Deleted!',
                'Your User detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your User detail file is safe :)',
                'error'
            );
        }
    });
}

}
