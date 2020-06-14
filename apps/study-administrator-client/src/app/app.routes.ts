import { Routes, RouterModule } from "@angular/router";
import { CreateStudyComponent } from "./create-study/create-study.component";
import { OverviewComponent } from "./overview/overview.component";
import { RequestStudyDataComponent } from "./request-study-data/request-study-data.component";

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: "study",
    component: CreateStudyComponent,
  },
  {
    path: "overview",
    component: OverviewComponent,
  },
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
  {
    path: "data-loader",
    component: RequestStudyDataComponent,
  },
];
export const AppRouterModule = RouterModule.forRoot(routes);
