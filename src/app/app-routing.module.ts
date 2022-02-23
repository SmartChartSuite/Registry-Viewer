import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {LoginComponent} from "./components/login/login.component";
import {CaseExplorerComponent} from "./components/case-explorer/case-explorer.component";
import {RegistryViewerComponent} from "./components/registry-viewer/registry-viewer.component";

const routes: Routes = [
  //We need to add Login guard to this section
  {
    path: '',
    component: CaseExplorerComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registry-viewer',
    component: RegistryViewerComponent
  },
  { // This path MUST ALWAYS be the last path!!!
    // Do not add any paths below this point or they will not work and will be redirected to landing.
    path: '**', redirectTo: ''
  }
  // End Routes Secured by LoginGuard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
