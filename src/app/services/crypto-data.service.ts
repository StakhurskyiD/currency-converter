// src/app/services/crypto-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  constructor(private http: HttpClient) {}

  getCryptoData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(10000),
      catchError(error => {
        console.error('Error fetching rates:', error);
        return of([]);
      })
    );
  }
}