import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { MatButtonModule, MatCheckboxModule } from "@angular/material";

// used to create fake backend
import { MatTableModule } from "@angular/material/table";
import { ExportAsModule } from "ngx-export-as";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { AlertComponent } from "./_components";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
// pages
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { JewelleryStatisticsComponent } from "./jewellery-statistics";
import { SalesAndStoreStatisticsComponent } from "./sales-and-store-statistics";
import { StoresComponent } from "./stores/stores.component";
import { FiltersRowComponent } from "./filters-row/filters-row.component";
import {
  MatButtonModule,
  MatCheckboxModule,
  // MatTableModule,
  MatInputModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";
import { UserManagementComponent } from "./user-management/user-management.component";
import { ChartModule } from "primeng/chart";
import { MessageService } from "primeng/api";
import { ToggleButtonModule } from "primeng/togglebutton";

import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";

import { PDFExportModule } from "@progress/kendo-angular-pdf-export";

import { ExcelExportModule } from "@progress/kendo-angular-excel-export";

import { AgmCoreModule } from "@agm/core";
import { MapComponent } from "./map/map.component";
import { TopJewelryComponent } from "./top-jewelry/top-jewelry.component";

@NgModule({
  imports: [
    ToastModule,
    CalendarModule,
    ChartModule,
    ToggleButtonModule,
    BrowserModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    routing,
    MatInputModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ExportAsModule,
    PDFExportModule,
    ExcelExportModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyASd8qxNEECgrbQLHO9luNdgPZUpwlc5bk"
    })
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    JewelleryStatisticsComponent,
    SalesAndStoreStatisticsComponent,
    UserManagementComponent,
    FiltersRowComponent,
    StoresComponent,
    AddEditUserComponent,
    MapComponent,
    TopJewelryComponent
  ],
  entryComponents: [AddEditUserComponent],

  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
