import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryImageComponent } from './components/category-image/category-image.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { TagsComponent } from './components/tags/tags.component';
import { SubCategoryImageComponent } from './components/sub-category-image/sub-category-image.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CancelOrdersComponent } from './components/cancel-orders/cancel-orders.component';
import { CancelOrderDetailsComponent } from './components/cancel-order-details/cancel-order-details.component';
import { PromoCodesComponent } from './components/promo-codes/promo-codes.component';
import { CategoryBannerImageComponent } from './components/category-banner-image/category-banner-image.component';
import { MobileBannerComponent } from './components/mobile-banner/mobile-banner.component';
import { MobileBannerImageComponent } from './components/mobile-banner-image/mobile-banner-image.component';
import { ColorsComponent } from './components/colors/colors.component';
import { LinkProductsComponent } from './components/link-products/link-products.component';
import { LinkingProductsComponent } from './components/linking-products/linking-products.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LocationComponent } from './components/location/location.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { AdBannerImageComponent } from './components/ad-banner-image/ad-banner-image.component';
import { RegionComponent } from './region/region.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { PincodeComponent } from './pincode/pincode.component';
import { UnitsComponent } from './units/units.component';
import { WeightComponent } from './weight/weight.component';
import { TaxComponent } from './tax/tax.component';
import { FlavourComponent } from './flavour/flavour.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { VaryComponent } from './vary/vary.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SuggestedProductComponent } from './suggested-product/suggested-product.component';
import { DiscountComponent } from './discount/discount.component';
import { CategoryDiscountComponent } from './category-discount/category-discount.component';
import { ProductDiscountComponent } from './product-discount/product-discount.component';
import { CustomerDiscountComponent } from './customer-discount/customer-discount.component';
import { DriverComponent } from './driver/driver.component';
import { AddonsComponent } from './components/addons/addons.component';
import { AddonImageComponent } from './components/addon-image/addon-image.component';
import { LatestArrivalComponent } from './components/latest-arrival/latest-arrival.component';
import { LatestArrivalImageComponent } from './components/latest-arrival-image/latest-arrival-image.component';
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
import {ContactdetailComponent} from './contactdetail/contactdetail.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TestimonialListComponent } from './testimonial-list/testimonial-list.component';
import { TestimonialImguploadComponent } from './testimonial-imgupload/testimonial-imgupload.component';
import { HometextareaComponent } from './hometextarea/hometextarea.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { TestimonyImageComponent } from './testimony-image/testimony-image.component';







const routes: Routes = [
    {path: 'categories', component: CategoryComponent},
    {path: 'category-image/:id', component: CategoryImageComponent},
    {path: 'category-banner-image/:id', component: CategoryBannerImageComponent},
    {path: 'sub-categories', component: SubCategoryComponent},
    {path: 'sub-category-image/:id', component: SubCategoryImageComponent},
    {path: 'tags', component: TagsComponent},
    {path: 'sizes', component: SizesComponent},
    {path: 'color', component: ColorsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product-image/:id', component: ProductImageComponent},
    {path: 'link-products', component: LinkProductsComponent},
    {path: 'linking-products/:id', component: LinkingProductsComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'order-detail/:id', component: OrderDetailsComponent},
    {path: 'cancel-orders', component: CancelOrdersComponent},
    {path: 'cancel-order-detail/:id', component: CancelOrderDetailsComponent},
    {path: 'banner', component: BannerComponent},
    {path: 'banner-image/:id', component: BannerImageComponent},
    {path: 'ad-banner', component: AdBannerComponent},
    {path: 'ad-banner-image/:id', component: AdBannerImageComponent},
    {path: 'mobile-banner', component: MobileBannerComponent},
    {path: 'mobile-banner-image/:id', component: MobileBannerImageComponent},
    {path: 'promo-code', component: PromoCodesComponent},
    {path: 'header-menu', component: HeaderMenuComponent},
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'location', component: LocationComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'region', component: RegionComponent},
    {path: 'location-details', component: LocationDetailsComponent},
    {path: 'pincode', component: PincodeComponent},
    {path: 'unit', component: UnitsComponent},
    {path: 'weight', component: WeightComponent},
    {path: 'tax', component: TaxComponent},
    {path: 'flavour', component: FlavourComponent},
    {path: 'customer-details', component: CustomerDetailsComponent},
    {path: 'terms-and-condition', component: TermsAndConditionComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'disclaimer', component: DisclaimerComponent},
    {path: 'dispatch', component: DispatchComponent},
    {path: 'vary', component: VaryComponent},
    {path: 'create-product', component: CreateProductComponent},
    {path: 'edit-product/:id', component: EditProductComponent},
    {path: 'suggested-product', component: SuggestedProductComponent},
    {path: 'discount', component: DiscountComponent},
    {path: 'category-discount', component: CategoryDiscountComponent},
    {path: 'product-discount', component: ProductDiscountComponent},
    {path: 'customer-discount', component: CustomerDiscountComponent},
    {path: 'driver', component: DriverComponent},
    {path: 'addons', component: AddonsComponent},
    {path: 'addon-image/:id', component: AddonImageComponent},
    {path:'latest-arrivals', component:LatestArrivalComponent},
    {path: 'latest-arrivals-image/:id', component:LatestArrivalImageComponent},
    {path:'lashcourse',component:LashcoursesComponent},
    {path:'HomeSectionOne',component:Homesection1Component},
    {path:'HomesectionTwo',component:Homesection2Component},
    {path: 'HomesectionThree',component:Homesection3Component},
    {path:'HomesectionFour',component:Homesection4Component},
    {path:'coursesSectionOne',component:CoursesSection1Component},
    {path:'coursesSectionTwo',component:Section2Component},
    {path:'coursesSectionThree',component:Section3Component},
    {path:'coursesSectionFour',component:Section4Component},
    {path:'course1Readmore',component:Readmore1Component},
    {path:'course2Readmore',component:Readmore2Component},
    {path:'course3Readmore',component:Readmore3Component},
    {path:'othercoursesSection1',component:OtherCoursesSection1Component},
    {path:'othercoursesSection2',component:OtherCoursesSection2Component},
    {path:'othercoursesSection3',component:OtherCoursesSection3Component},
    {path:'Policies',component:HayalashpoliciesComponent},
    {path:'trainerSectionOne',component:TrainerSecOneComponent},
    {path:'trainerSectionTwo',component:TrainerSecTwoComponent},
    {path:'trainerSectionThree',component:TrainerSecThreeComponent},
    {path:'lashTalkSectionOne',component:LashtalkSecOneComponent},
    {path:'lashTalkSectionTwo',component:LashtalkSecTwoComponent},
    {path:'lashTalkSectionThree',component:LashtalkSecThreeComponent},
     {path:'contactUs',component:ContactdetailComponent},
     {path:'testimonial-detail/:id',component:TestimonialComponent},
     {path:'testimonial-list',component:TestimonialListComponent},
     {path:'testimonialimageupload/:menu/:id',component:TestimonialImguploadComponent},
      {path:'hometextarea',component:HometextareaComponent},
      {path:'event-detail/:id',component:EventDetailsComponent},
      {path:'testimony',component:TestimonyComponent},
      {path:'testimony-image/:id',component:TestimonyImageComponent},





    // {path: 'users', component: UsersComponent, data: {role: 'user'}, canActivate: [AuthGuard]},
    {path: 'users', component: UsersComponent},
    {path: 'unauth', component: UnauthorizedComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ useHash: true }),],
    exports: [RouterModule]
})
export class AppRoutingModule { }
