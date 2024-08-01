import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/currency.enum';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyInputComponent]
})
export class ConverterComponent implements OnInit {
  currencies = Object.values(Currency);
  form!: FormGroup;
  rates: { [key: string]: { [key: string]: number } } = {};
  lastUpdatedControl: 'amountLeft' | 'amountRight' | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      amountLeft: new FormControl({ value: 0, currency: Currency.USD }),
      amountRight: new FormControl({ value: 0, currency: Currency.UAH })
    });

    this.fetchRates();

    this.form.controls['amountLeft'].valueChanges.subscribe((value) => {
      this.lastUpdatedControl = 'amountLeft';
      this.convert();
    });

    this.form.controls['amountRight'].valueChanges.subscribe((value) => {
      this.lastUpdatedControl = 'amountRight';
      this.convert();
    });

    this.form.controls['amountLeft'].get('currency')?.valueChanges.subscribe(() => {
      this.convert();
    });

    this.form.controls['amountRight'].get('currency')?.valueChanges.subscribe(() => {
      this.convert();
    });
  }

  fetchRates(): void {
    this.currencies.forEach((currency) => {
      this.currencyService.getRates(currency).subscribe((data) => {
        this.rates[currency] = data;
      });
    });
  }

  convert(): void {
    const { amountLeft, amountRight } = this.form.value;

    if (this.lastUpdatedControl === 'amountLeft') {
      const rate = this.getRate(amountLeft.currency, amountRight.currency);
      this.updateAmountRight(amountLeft.value, rate);
    } else if (this.lastUpdatedControl === 'amountRight') {
      const rate = this.getRate(amountRight.currency, amountLeft.currency);
      this.updateAmountLeft(amountRight.value, rate);
    }
  }

  getRate(fromCurrency: string, toCurrency: string): number {
    return this.rates[fromCurrency][toCurrency] || 1;
  }

  updateAmountRight(amountLeft: number, rate: number): void {
    this.form.patchValue(
      {
        amountRight: {
          value: amountLeft * rate,
          currency: this.form.controls['amountRight'].value.currency
        }
      },
      { emitEvent: false }
    );
  }

  updateAmountLeft(amountRight: number, rate: number): void {
    this.form.patchValue(
      {
        amountLeft: {
          value: amountRight * rate,
          currency: this.form.controls['amountLeft'].value.currency
        }
      },
      { emitEvent: false }
    );
  }
}