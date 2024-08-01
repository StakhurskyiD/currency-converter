// src/app/services/currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CurrencyResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest';

  constructor(private http: HttpClient) {}

  getRates(baseCurrency: string): Observable<{ [key: string]: number }> {
    return this.http.get<CurrencyResponse>(`${this.apiUrl}/${baseCurrency}`).pipe(
      map(data => data.rates),
      catchError(err => {
        console.error('Error fetching rates:', err);
        return of({});
      })
    );
  }
}