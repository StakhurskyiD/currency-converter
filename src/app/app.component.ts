import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';
import { CryptoChartComponent } from './components/crypto-chart/crypto-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, ConverterComponent, CryptoChartComponent, CryptoChartComponent]
})
export class AppComponent {
  title = 'currency-converter';
}