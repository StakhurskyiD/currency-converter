// src/app/components/crypto-chart/crypto-chart.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { CryptoDataService } from '../../services/crypto-data.service';

@Component({
  selector: 'app-crypto-chart',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgxChartsModule,
    MatCardModule
  ],
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss']
})
export class CryptoChartComponent implements OnInit {
  cryptoData: any[] = [];
  chartData: any[] = [];
  isBrowser: boolean;

  showLegend: boolean = true;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f7931a', '#3c3c3d', '#26a17b', '#f0b90b', '#00ff9b', '#2775ca', '#00aae4', '#5a5f64', '#ba9f33', '#2a9efb']
  };
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Cryptocurrency';
  yAxisLabel: string = 'Market Cap (USD)';
  animations: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cryptoDataService: CryptoDataService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.fetchCryptoData();
    }
  }

  fetchCryptoData() {
    this.cryptoDataService.getCryptoData().subscribe((data: any[]) => {
      this.cryptoData = data;
      this.updateChartData();
    });
  }

  updateChartData() {
    this.chartData = this.cryptoData.map(crypto => ({
      name: crypto.name,
      value: crypto.market_cap
    }));
  }
}