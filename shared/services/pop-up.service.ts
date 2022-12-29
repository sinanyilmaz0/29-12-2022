import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PopupModel } from '../models/popupModel';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  isPopUp: BehaviorSubject<PopupModel> = new BehaviorSubject<PopupModel>({
    isOpen: false,
    title: '',
    description: '',
    icon: '',
    leftButtonText: '',
    rightButtonText: '',
    showOverlay:true,
    clickFunc: ()=> {}
  });

  constructor() {}

  startPopUp(popUp: PopupModel) {
    popUp.isOpen = true;
    this.isPopUp.next(popUp);

    // console.log(this.isPopUp.value.isOpen);
  }

  stopPopUp() {
    this.isPopUp.next({ ...this.isPopUp.value, isOpen: false });
  }
}
