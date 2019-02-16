import { Routes, RouterModule } from "@angular/router";
import { JewelleryStatisticsComponent } from "./jewellery-statistics";
import { SalesStatisticsComponent } from "./sales-statistics";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
// import { RegisterComponent } from './register';
import { AuthGuard } from "./_guards";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  {
    path: "jewellery-statistics/:id ",
    component: JewelleryStatisticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sales-statistics/:id ",
    component: SalesStatisticsComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
