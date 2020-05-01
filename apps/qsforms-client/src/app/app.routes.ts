import { Routes, RouterModule } from "@angular/router";
import { BloodmarkerComponent } from "./bloodmarker/bloodmarker.component";

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: "bloodmarker",
    component: BloodmarkerComponent,
  },
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
];
export const AppRouterModule = RouterModule.forRoot(routes);
