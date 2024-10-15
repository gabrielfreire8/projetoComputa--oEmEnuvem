import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-primary-input',
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.css',
  standalone: true,
  imports:[
    ReactiveFormsModule
  ],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => PrimaryInputComponent),
    multi: true
  }]
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() inputName: string = "";


  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched - fn
  }

  setDisabledState(isDisabled: boolean): void {

  }

}
