import { Component, Input } from '@angular/core';

@Component({
  selector: 'etiya-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.scss']
})
export class ButtonBarComponent {
  @Input() button1Clicked:boolean = false
  @Input() button2Clicked:boolean = false
  @Input() button3Clicked:boolean = false
  @Input() button4Clicked:boolean = false

}

//122rem 63.1rem
