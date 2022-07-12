import { Component, OnInit } from '@angular/core';
// import { CreateProductComponent } from 'src/app/create-product/create-product.component';
// import { createComponent } from '@angular/compiler/src/core';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.css'],
    
})
export class SidemenuComponent implements OnInit {
    
    user = `${localStorage.getItem('user_name')}`;
    role: any = `${localStorage.getItem('role')}`;
    roleName: any = `${localStorage.getItem('role_name')}`;
    constructor() { }

    ngOnInit() {
    }

}
