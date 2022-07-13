import { HttpClientModule, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NumberPickerModule } from 'ng-number-picker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryImageComponent } from './components/category-image/category-image.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { FoodDirective } from './directive/food.directive';
import { NumbersOnlyDirective } from './directive/numbers-only.directive';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { MarkdownModule } from 'ngx-markdown';
import {NgxImageCompressService} from 'ngx-image-compress';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { TagsComponent } from './components/tags/tags.component';
import { SubCategoryImageComponent } from './components/sub-category-image/sub-category-image.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import {MatSliderModule} from '@angular/material/slider';
import { CancelOrdersComponent } from './components/cancel-orders/cancel-orders.component';
import { CancelOrderDetailsComponent } from './components/cancel-order-details/cancel-order-details.component';
import { PromoCodesComponent } from './components/promo-codes/promo-codes.component';
import { CategoryBannerImageComponent } from './components/category-banner-image/category-banner-image.component';
import { MobileBannerComponent } from './components/mobile-banner/mobile-banner.component';
import { MobileBannerImageComponent } from './components/mobile-banner-image/mobile-banner-image.component';
import { ColorsComponent } from './components/colors/colors.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LinkProductsComponent } from './components/link-products/link-products.component';
import { LinkingProductsComponent } from './components/linking-products/linking-products.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LocationComponent } from './components/location/location.component';
import { RegionComponent } from './region/region.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { PincodeComponent } from './pincode/pincode.component';
import { UnitsComponent } from './units/units.component';
import { WeightComponent } from './weight/weight.component';
import { TaxComponent } from './tax/tax.component';
import { FlavourComponent } from './flavour/flavour.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { VaryComponent } from './vary/vary.component';
import { CreateProductComponent } from './create-product/create-product.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SuggestedProductComponent } from './suggested-product/suggested-product.component';
import { DiscountComponent } from './discount/discount.component';
import { CategoryDiscountComponent } from './category-discount/category-discount.component';
import { ProductDiscountComponent } from './product-discount/product-discount.component';
import { CustomerDiscountComponent } from './customer-discount/customer-discount.component';
import { DriverComponent } from './driver/driver.component';
import { LatestArrivalComponent } from './components/latest-arrival/latest-arrival.component';
import { LatestArrivalImageComponent } from './components/latest-arrival-image/latest-arrival-image.component';
import { LightboxModule } from 'ngx-lightbox';
import { LashcoursesComponent } from './lashcourses/lashcourses.component';
import { Homesection1Component } from './homesection1/homesection1.component';
import { Homesection2Component } from './homesection2/homesection2.component';
import { Homesection3Component } from './homesection3/homesection3.component';
import { Homesection4Component } from './homesection4/homesection4.component';
import { CoursesSection1Component } from './courses-section1/courses-section1.component';
import { Section2Component } from './COURSES/section2/section2.component';
import { Section3Component } from './COURSES/section3/section3.component';
import { Section4Component } from './COURSES/section4/section4.component';
import { Readmore1Component } from './COURSES/readmore1/readmore1.component';
import { Readmore2Component } from './COURSES/readmore2/readmore2.component';
import { Readmore3Component } from './COURSES/readmore3/readmore3.component';

import { UpcomingEventsComponent } from './COURSES/upcoming-events/upcoming-events.component';

import { OtherCoursesSection1Component } from './otherCourses/other-courses-section1/other-courses-section1.component';
import { OtherCoursesSection2Component } from './otherCourses/other-courses-section2/other-courses-section2.component';
import { OtherCoursesSection3Component } from './otherCourses/other-courses-section3/other-courses-section3.component';
import { HayalashpoliciesComponent } from './hayalashpolicies/hayalashpolicies.component';

import { TrainerSecOneComponent } from './trainer/trainer-sec-one/trainer-sec-one.component';
import { TrainerSecTwoComponent } from './trainer/trainer-sec-two/trainer-sec-two.component';
import { TrainerSecThreeComponent } from './trainer/trainer-sec-three/trainer-sec-three.component';
import { LashtalkSecOneComponent } from './lashtalk/lash-talk-sec-one/lash-talk-sec-one.component';
import { LashtalkSecTwoComponent } from './lashtalk/lash-talk-sec-two/lash-talk-sec-two.component';
import { LashtalkSecThreeComponent } from './lashtalk/lash-talk-sec-three/lash-talk-sec-three.component';


import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TestimonialListComponent } from './testimonial-list/testimonial-list.component';
import { TestimonialImguploadComponent } from './testimonial-imgupload/testimonial-imgupload.component';
import { ImageuploadcomponentComponent } from './imageuploadcomponent/imageuploadcomponent.component';
import { HometextareaComponent } from './hometextarea/hometextarea.component';


import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EventDetailsComponent } from './event-details/event-details.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { TestimonyImageComponent } from './testimony-image/testimony-image.component';
// import {MatTableModule} from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material';







@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => this.handleError(err)));
    }


    private handleError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl(`/`);
            return of(err.message);
        }
        return Observable.throw(err);
    }
}
// const appRoutes: Routes = [
//   { path: '**', component: AppComponent },
// ];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        SidemenuComponent,
        DashboardComponent,
        FoodDirective,
        NumbersOnlyDirective,
        UsersComponent,
        UnauthorizedComponent,
        PageNotFoundComponent,
        FooterComponent,
        CategoryComponent,
        CategoryImageComponent,
        DragAndDropDirective,
        ProgressComponent,
        ProductImageComponent,
        ProductsComponent,
        HeaderMenuComponent,
        SubCategoryComponent,
        TagsComponent,
        SubCategoryImageComponent,
        SizesComponent,
        OrdersComponent,
        OrderDetailsComponent,
        CancelOrdersComponent,
        CancelOrderDetailsComponent,
        PromoCodesComponent,
        CategoryBannerImageComponent,
        MobileBannerComponent,
        MobileBannerImageComponent,
        ColorsComponent,
        LinkProductsComponent,
        LinkingProductsComponent,
        SettingsComponent,
        LocationComponent,
        RegionComponent,
        LocationDetailsComponent,
        PincodeComponent,
        UnitsComponent,
        WeightComponent,
        TaxComponent,
        FlavourComponent,
        CustomerDetailsComponent,
        TermsAndConditionComponent,
        PrivacyPolicyComponent,
        DisclaimerComponent,
        DispatchComponent,
        VaryComponent,
        CreateProductComponent,
        EditProductComponent,
        SuggestedProductComponent,
        DiscountComponent,
        CategoryDiscountComponent,
        ProductDiscountComponent,
        CustomerDiscountComponent,
        DriverComponent,
        LatestArrivalComponent,
        LatestArrivalImageComponent,
        LashcoursesComponent,
        Homesection1Component,
        Homesection2Component,
        Homesection3Component,
        Homesection4Component,
        CoursesSection1Component,
        Section2Component,
        Section3Component,
        Section4Component,
        Readmore1Component,
        Readmore2Component,
        Readmore3Component,

        UpcomingEventsComponent,

        OtherCoursesSection1Component,
        OtherCoursesSection2Component,
        OtherCoursesSection3Component,
        HayalashpoliciesComponent,
        TrainerSecOneComponent,
        TrainerSecTwoComponent,
        TrainerSecThreeComponent,
        LashtalkSecOneComponent,
        LashtalkSecTwoComponent,
        LashtalkSecThreeComponent,
        ContactdetailComponent,
        TestimonialComponent,
        TestimonialListComponent,
        TestimonialImguploadComponent,
        ImageuploadcomponentComponent,
        HometextareaComponent,
        EventDetailsComponent,
        TestimonyComponent,
        TestimonyImageComponent


    ],

    imports: [
      MatSlideToggleModule,
      MatInputModule,
      // MatPaginatorModule,
      // MatTableModule,
      // MatPaginator,
      // MatSort,
      MatCardModule,
      MatTabsModule,
      MatGridListModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        BrowserAnimationsModule,
        NgxMaterialTimepickerModule,
        AngularEditorModule,
        ToastrModule.forRoot({
        preventDuplicates: true,
        positionClass: 'toast-top-right',
        timeOut: 3000,
        progressBar : true,
        progressAnimation: 'increasing',
        }),
        AppRoutingModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        TabsModule.forRoot(),
        AngularMultiSelectModule,
        NumberPickerModule,
        NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.rectangleBounce,
            backdropBackgroundColour: '#fff',
            backdropBorderRadius: '25px',
            primaryColour: '#185698',
            secondaryColour: '#185698',
            tertiaryColour: '#185698'
        }),
        ImageCropperModule,
        NgxFileDropModule,
        LazyLoadImageModule,
        DragDropModule,
        MatSliderModule,
        MarkdownModule.forRoot(),
        ColorPickerModule,
        LightboxModule,


    ],
    providers: [
        NgxImageCompressService,{
        provide: HTTP_INTERCEPTORS,
        useFactory: function(router:Router) {
        return new AuthInterceptor(router)
        },
        multi: true,
        deps: [Router]
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
