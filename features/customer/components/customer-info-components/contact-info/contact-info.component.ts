import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupModel } from 'src/app/shared/models/popupModel';
import { PopUpService } from 'src/app/shared/services/pop-up.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  contactMediumForm!:FormGroup
  show:boolean = false
  showButtons:boolean=false
  submitted:boolean = true;


  constructor(private formBuilder:FormBuilder,private popUpService:PopUpService){}

  ngOnInit(): void {
    this.createContactMediumForm()
    this.subsToPopUp()
  }

  createContactMediumForm():void{
    this.contactMediumForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      homePhone:[''],
      mobilePhone:['',[Validators.required]],
      fax:['']
    })
  }

  subsToPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.show = response.isOpen;
    });
  }

  get f() {
    return this.contactMediumForm.controls;
  }

  contactMediumSubmit(){
    if(this.contactMediumForm.invalid){
    let p: PopupModel = { isOpen: true, title: 'Warning',icon:'fa-sharp fa-solid fa-circle-exclamation',description:"E-mail and Mobile Number areas can't be empty!"};
    this.popUpService.startPopUp(p)
    return;
    }

    this.submitted = false;

    alert('Başarılı')
  }
  showButton(){
    this.showButtons = true
  }
  hiddenButtons(){
    this.showButtons = false

  }

}
