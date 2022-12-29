import { Component } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title: string = 'Page name';

  constructor(private languageService: LanguageService, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.getTitle()
  }

  changeLanguage(code: string) {
    this.languageService.setLanguage(code);
  }
  get selectedLanguage() {
    // console.log(this.languageService.selectedLanguage);
    return this.languageService.selectedLanguage;
  }

  getTitle(){
    this.navbarService.title.subscribe((value)=>{
      this.title=value
      console.log(value)
    })
  }
}
