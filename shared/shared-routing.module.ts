import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [

  { path: '',pathMatch:'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: '404notfound', component: NotFoundComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
