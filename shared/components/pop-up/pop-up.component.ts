import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PopUpService } from '../../services/pop-up.service';
import { PopupModel } from '../../models/popupModel';

@Component({
  selector: 'etiya-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  constructor(private popUpService: PopUpService) {}

  ngOnInit(): void {
    this.showPopUp();
  }

  popUp!: PopupModel;

  showPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.popUp = response;
      console.log(response.clickFunc);
    });
  }

  closePopUp() {
    this.popUp.isOpen = false;
    this.popUpService.stopPopUp();
  }
}
