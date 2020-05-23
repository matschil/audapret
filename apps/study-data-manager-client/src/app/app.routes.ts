import { Routes, RouterModule } from "@angular/router";
import { GrantComponent } from "./grant/grant.component";
import { DataLoaderComponent } from "./data-loader/data-loader.component";
import { InitializationComponent } from "./initialization/initialization.component";
import { LoginComponent } from "./login/login.component";

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: "grant",
    component: GrantComponent,
  },
  {
    path: "data-loader",
    component: DataLoaderComponent,
  },
  {
    path: "init",
    component: InitializationComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
];
export const AppRouterModule = RouterModule.forRoot(routes);
