import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxChartsModule, Color, colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-crypto-chart',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss']
})
export class CryptoChartComponent implements OnInit {
  cryptoData: any[] = [];
  chartData: any[] = [];
  isBrowser: boolean;

  showLegend: boolean = true;
  colorScheme: Color = colorSets.find(s => s.name === 'vivid')!;
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Cryptocurrency';
  yAxisLabel: string = 'Price (USD)';
  animations: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.fetchCryptoData();
    }
  }

  fetchCryptoData() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.cryptoData = data;
      this.updateChartData();
    });
  }

  updateChartData() {
    this.chartData = this.cryptoData.map(crypto => ({
      name: crypto.name,
      value: crypto.current_price
    }));
  }
}