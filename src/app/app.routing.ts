﻿import { Routes, RouterModule } from "@angular/router";
import { JewelleryStatisticsComponent } from "./jewellery-statistics";
import { SalesStatisticsComponent } from "./sales-statistics";
import { UserManagementComponent } from "./user-management";
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
    path: "statistics/jewellery/:id",
    component: JewelleryStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "statistics/sales/:id",
    component: SalesStatisticsComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
