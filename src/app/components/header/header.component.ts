import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/currency.enum';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { currencyIcons } from '../../models/currency-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  rates$: Observable<{ [key: string]: number }> | undefined;
  currencies = [Currency.USD, Currency.EUR, Currency.GBP, Currency.JPY, Currency.UAH];
  currencyIcons = currencyIcons;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchRates();
  }

  fetchRates() {
    this.rates$ = this.currencyService.getRates('USD').pipe(
      map((data) => {
        const rates = data.rates;
        const uahRate = rates['UAH'];
        const convertedRates: { [key: string]: number } = {};
        for (const currency in rates) {
          convertedRates[currency] = uahRate / rates[currency];
        }
        convertedRates['USD'] = uahRate;
        convertedRates['UAH'] = 1;
        return convertedRates;
      }),
      catchError(err => {
        console.error('Error fetching rates:', err);
        return of({});
      })
    );
  }

  convertToUAH(rates: { [key: string]: number }, currency: string): number {
    return rates[currency];
  }

  getCurrencyIcon(currency: string): string {
    return this.currencyIcons[currency] || '';
  }
}