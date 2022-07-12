import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    productList: any = [];
    loading = false;
    loadingBtn = false;
    showPopup = false;
    stockBox = false;
    modalBoxName = '';
    keyword = 'name';
    categoryName: any;
    productName: any;
    productPrice: any;
    productDiscPrice: any;
    productDesc: any;
    productSize = '';
    productImages: any = [];
    editProductId: any;

    sizesList: any = [];
    sizeArray: any = [];
    sizeId: any = [];
    selectedSize: any = [];
    sizeSettings = {};

    categories: any = [];
    sno = 1;
    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    viewBox = false;
    showImage = true;
    imageUrl = '';

    productStocks:any = [];
    stockProductName = '';
    stockForm: FormGroup;

    // sizeQuantity:any[] = [];

    defaultImage = 'assets/images/loader.gif';
    @ViewChild('auto', { static: false }) auto;
    @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
    @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
    constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.index();
        this.getActiveCategory();
        this.getActiveSize();
        this.search();
        this.imageUrl = this.imageService.getMinImageurl();
        this.sizeSettings = {
            singleSelection: false,
            text: 'Select Sizes',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
        this.stockForm = this.formBuilder.group({
            product_id: new FormControl('', Validators.required),
        });
    }

    getActiveCategory() {
        this.categories = [];
        this.loading = true;
        this.apiService.getData('getActiveCategory').subscribe(data => {
            const categories = data.data;
            for (const category of categories) {
                this.categories.push({ id: category.id, name: category.category_name });
            }
            console.log(this.categories);
        });
    }

    getActiveSize() {
        this.sizesList = [];
        this.loading = true;
        this.apiService.getData('getActiveSize').subscribe(data => {
            const sizes = data.data;
            for (const size of sizes) {
                this.sizesList.push({ id: size.id, itemName: size.size_name });
            }
        });
    }

    index() {
        this.loading = true;
        this.apiService.index('product').subscribe(data => {
            this.productList = data.data;
            this.loading = false;
        });
    }

    store() {
        this.loadingBtn = true;
        this.sizeId = [];
        this.sizeArray.forEach(element => {
            this.sizeId.push(element.id);
        });
        this.selectedSize = this.sizeId.toString();
        this.apiCall('store', 'product');
    }


    show(id) {
        this.apiService.show('product/' + id).subscribe((data) => {
            const value = data.data;
            this.editProductId = id;
            this.categoryName = value.category.category_name;
            this.sizeArray = value.product_sizes;
            console.log('sizeArray', this.sizeArray);
            this.productName = value.product_name;
            this.productPrice = value.product_price;
            this.productDiscPrice = value.product_discount_price;
            this.productDesc = value.product_description;
            this.productImages = value.images;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.sizeId = [];
        this.sizeArray.forEach(element => {
            this.sizeId.push(element.id);
        });
        this.selectedSize = this.sizeId.toString();
        this.apiCall('update', 'product/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    productSwitch(id) {
        this.apiCall('getData', 'productSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchProduct', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.productList = [];
            } else {
                this.productList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            category_id : this.categoryName.id,
            product_name: this.productName,
            product_price: this.productPrice,
            product_discount_price: this.productDiscPrice,
            product_description: this.productDesc,
        } : value;
        if(this.selectedSize.length) {
            value['product_sizes'] = this.selectedSize;
        }
        this.apiService[name](url, value).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.loadingBtn = false;
                this.popUpClose();
                this.index();
            } else {
                this.toastr.error(data.message);
                this.loadingBtn = false;
                this.errorMsg = data.data;
            }
        });
    }

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if (type === 'Create') {
                this.store();
            } else if (type === 'Edit') {
                this.update(id);
            }
        }
    }

    swalCall(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.apiCall('destroy', 'product/' + id);
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe.',
                    'error'
                );
            }
        });
    }

    openModalBox(type, id = '', name = '') {
        if(type === 'Edit') {
            this.modalBoxName = type;
            this.show(id);
            this.showPopup = true;
        } else if (type === 'Stocks') {
            this.modalBoxName = type;
            this.stockBox = true;
            this.stockProductName = name;
            this.getStockOfProduct(id);
        } else if (type === 'Create') {
            this.modalBoxName = 'Create';
            this.showPopup = true;
        }
    }

    viewImage(id) {
        this.show(id);
        this.viewBox = true;
       
    }

    popUpClose() {
        this.showPopup = this.viewBox = this.stockBox = false;
        this.categoryName =
        this.productName =
        this.productPrice =
        this.productDiscPrice =
        this.productDesc =
        this.selectedSize = '';
        this.errorMsg = this.sizeArray = [];
    }


    openSize(event) {
        this.sizeDropDown.openDropdown();
    }

    onDeSelectAllSizes(event) {
        this.selectedSize = [];
        this.sizeArray = [];
        this.sizeId = [];
    }

    onChangeSearch(val: string) {
        if (val === '') {
            this.auto.close();
            return false;
        }
    }

    onFocused(e) {
        this.auto.close();
    }

    getStockOfProduct(id) {
        this.apiService.getData('getStockOfProduct', id).subscribe(data => {
            this.productStocks = data.data;
            this.productStocks.forEach((stock: any) => {
                this.stockForm.addControl(stock.id, new FormControl('', Validators.required));
                const element = this.stockForm.get(stock.id.toString());
                element.patchValue(stock.stock_quantity);
            });
        });
    }

    updateProductStocks() {
        const value = this.stockForm.value;
        delete value['product_id'];
        this.apiService.postData(value, 'updateProductStocks').subscribe(data => {
            this.toastr.success(data.message);
            this.popUpClose();
        });
    }

    outOfStocks() {
        this.productStocks.forEach((stock: any) => {
            const element = this.stockForm.get(stock.id.toString());
            element.patchValue(0);
        });
        this.updateProductStocks();
    }

}
