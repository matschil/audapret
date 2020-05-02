import { Routes, RouterModule } from "@angular/router";
import { BloodmarkerComponent } from "./forms/bloodmarker/bloodmarker.component";
import { WellBeingComponent } from "./forms/well-being/well-being.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: "bloodmarker",
    component: BloodmarkerComponent,
  },
  {
    path: "well-being",
    component: WellBeingComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
];
export const AppRouterModule = RouterModule.forRoot(routes);
