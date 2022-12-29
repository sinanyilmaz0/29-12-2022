import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  title:BehaviorSubject<string>=new BehaviorSubject<string>('')
  setTitle(value:string){
    this.title.next(value)

}
}
