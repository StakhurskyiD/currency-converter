import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/currency.enum';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ConverterComponent implements OnInit {
  currencies = Object.values(Currency);
  rates: { [key: string]: any } = {};
  amountLeft: number | undefined;
  currencyLeft: Currency = Currency.USD;
  amountRight: number | undefined;
  currencyRight: Currency = Currency.UAH;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchRates();
  }

  fetchRates() {
    this.currencies.forEach((currency) => {
      this.currencyService.getRates(currency).subscribe((data) => {
        this.rates[currency] = data.rates;
      });
    });
  }

  convertFromLeftAmount() {
    if (this.rates[this.currencyLeft] && this.amountLeft) {
      const rate = this.rates[this.currencyLeft][this.currencyRight];
      this.amountRight = this.amountLeft * rate;
    }
  }

  convertFromRightAmount() {
    if (this.rates[this.currencyRight] && this.amountRight) {
      const rate = this.rates[this.currencyRight][this.currencyLeft];
      this.amountLeft = this.amountRight * rate;
    }
  }
}