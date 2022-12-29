import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-template',
  templateUrl: './ui-background-template.component.html',
  styleUrls: ['./ui-background-template.component.scss'],
})
export class UiBackgroundTemplateComponent {
  @Input() width!: string;
  @Input() height!: string;
  @Input() margin?:string
}
