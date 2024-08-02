import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CurrencyInputComponent implements ControlValueAccessor, OnInit {
  @Input() currencies: string[] = [];
  @Input() currency: string = '';

  control: FormControl = new FormControl();
  currencyControl: FormControl = new FormControl(this.currency);

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.onChange({ value: value === '' ? null : value, currency: this.currencyControl.value });
      this.onTouched();
    });

    this.currencyControl.valueChanges.subscribe(value => {
      this.onChange({ value: this.control.value === '' ? null : this.control.value, currency: value });
      this.onTouched();
    });
  }

  writeValue(value: any): void {
    if (value && typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('currency')) {
      this.control.setValue(value.value === 0 ? '' : value.value, { emitEvent: false });
      this.currencyControl.setValue(value.currency, { emitEvent: false });
    } else {
      this.control.setValue(value === 0 ? '' : value, { emitEvent: false });
      this.currencyControl.setValue(this.currency, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
      this.currencyControl.disable();
    } else {
      this.control.enable();
      this.currencyControl.enable();
    }
  }
}