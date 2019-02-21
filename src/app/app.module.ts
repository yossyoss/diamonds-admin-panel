import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { MatButtonModule, MatCheckboxModule } from "@angular/material";

// used to create fake backend
// import { MatTableModule } from "@angular/material/table";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { AlertComponent } from "./_components";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
// pages
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { JewelleryStatisticsComponent } from "./jewellery-statistics";
import { SalesStatisticsComponent } from "./sales-statistics";
import { StoreStatisticsComponent } from "./store-statistics/store-statistics.component";
import { StoresComponent } from "./stores/stores.component";
import { FiltersRowComponent } from "./filters-row/filters-row.component";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
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
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";

@NgModule({
  imports: [
    ToastModule,
    CalendarModule,
    ChartModule,
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
    MatTreeModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    JewelleryStatisticsComponent,
    SalesStatisticsComponent,
    UserManagementComponent,
    StoreStatisticsComponent,
    FiltersRowComponent,
    StoresComponent
  ],
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
