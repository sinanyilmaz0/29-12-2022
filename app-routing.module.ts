import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './shared/pages/login/login.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
