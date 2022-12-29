import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'etiya-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() inputLabel!: string;
  @Input() requiredField: boolean = false;
  @Input() inputType: string = 'text';
  @Input() setDisabled:boolean = false;





  @Input() icon1!: string;
  @Input() icon2!: string;
  @Input() value: any;
  @Input() name: string;
  @Input() form: FormGroup;
  disabled = false;


  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  markAsTouched(): void {
    this.onTouched();
  }




  // !

  get className(): string {
    if (
      this.form &&
      this.form.get(this.name).invalid &&
      this.form.get(this.name).touched &&
      this.form.get(this.name).dirty
    ) {
      return 'ng-invalid';
    }
    return '';
  }

  // !





  public passwordToggle: boolean = false;
  public passwordShow: boolean = true;

  ngOnInit(): void {
    this.passwordToggle = this.inputType == 'password';

  }
   passwordToggleEvent() {
    this.passwordShow = !this.passwordShow;
    if (this.passwordShow) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }
}
