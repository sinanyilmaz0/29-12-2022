import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { BackgroundTemplateComponent } from './components/background-template/background-template.component';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { commonReducers } from './store/commonReducers';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    PopUpComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    MainLayoutComponent,
    SelectOptionComponent,
    BackgroundTemplateComponent,
    TextAreaComponent,
    NotFoundComponent,
    ButtonBarComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('language') || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(commonReducers),
    StoreDevtoolsModule.instrument()
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    PopUpComponent,
    TranslateModule,
    NavbarComponent,
    SidebarComponent,
    SelectOptionComponent,
    BackgroundTemplateComponent,
    MainLayoutComponent,
    TextAreaComponent,
    NotFoundComponent,
    ButtonBarComponent,

  ],
})
export class SharedModule {}
