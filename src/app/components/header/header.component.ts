import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  usdToUah: number | undefined;
  eurToUah: number | undefined;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates('USD').subscribe((data) => {
      this.usdToUah = data.rates['UAH'];
    });
    this.currencyService.getRates('EUR').subscribe((data) => {
      this.eurToUah = data.rates['UAH'];
    });
  }
}