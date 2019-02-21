import { Routes, RouterModule } from "@angular/router";
import { JewelleryStatisticsComponent } from "./jewellery-statistics";
import { SalesAndStoreStatisticsComponent } from "./sales-and-store-statistics";
import { StoreStatisticsComponent } from "./store-statistics";
import { UserManagementComponent } from "./user-management";
import { StoresComponent } from "./stores";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { AuthGuard } from "./_guards";

const appRoutes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "", component: LoginComponent },
  {
    path: "users",
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "stores",
    component: StoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "statistics/jewellery/:id",
    component: JewelleryStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "statistics/sales/:id",
    component: SalesAndStoreStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "statistics/stores/:id",
    component: SalesAndStoreStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "statistics/store/:id",
    component: StoreStatisticsComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
