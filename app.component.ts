import { Component, OnInit } from '@angular/core';

import { LanguageService } from './core/services/language.service';
import { PopUpService } from './shared/services/pop-up.service';
import { PopupModel } from './shared/models/popupModel';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'etiya-5-telco-frontend';
  constructor(
    private popUpService: PopUpService,
    private languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.showPopUp();
  }

  popUpModel: PopupModel = {
    isOpen: true,
    title: 'Warning!',
    description: 'Are you sure to delete this customer ?',
    icon: 'fa-sharp fa-solid fa-circle-exclamation',
    leftButtonText: 'Cancel',
    rightButtonText: 'Delete',
  };
  show: boolean = false;
  showOverlay: boolean = true;
  runPopUp() {
    this.popUpService.startPopUp(this.popUpModel);
    this.showPopUp();
  }
  stopPopup() {
    this.popUpService.stopPopUp();
  }

  changeLanguage(code: string) {
    this.languageService.setLanguage(code);
  }

  showPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.show = response.isOpen;

      this.showOverlay = response.showOverlay;

      console.log(this.show);
      console.log(response);
    });
  }
}
