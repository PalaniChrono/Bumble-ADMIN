import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    role: any = `${localStorage.getItem('role_name')}`;
    roleId: any = `${localStorage.getItem('role_id')}`;
    userName = `${localStorage.getItem('user_name')}`;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
    }

    logout() {
        // this.apiService.getData('userLogout').subscribe((data) => {
            localStorage.clear();
            location.reload();
            // console.log(data);
            this.router.navigate(['']);

        // });
    }
    


}
