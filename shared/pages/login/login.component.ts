import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { PopUpService } from '../../services/pop-up.service';
import { PopupModel } from '../../models/popupModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  export class LoginComponent {
  loginForm!: FormGroup;
  popupShow: boolean = false;
  isAuthenticated: boolean = this.authService.isAuthenticated;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.subsToPopUp();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  subsToPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.popupShow = response.isOpen;
    });
  }
  onLogin() {
    if (!this.loginForm.invalid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.localStorageService.add('token', response.access_token);
          this.router.navigateByUrl('/customer/search');
        },
        (error) => {
          let p: PopupModel = {
            isOpen: true,
            icon: 'fa-sharp fa-solid fa-circle-exclamation',
            title: 'Warning',
            description: 'Wrong username or password. Please try again.',
          };
          this.popUpService.startPopUp(p);
        }
      );
    }
  }
}
