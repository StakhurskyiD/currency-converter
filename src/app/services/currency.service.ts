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
  private readonly apiUrl: string = 'https://api.exchangerate-api.com/v4/latest';

  constructor(private readonly http: HttpClient) {}

  getRates(baseCurrency: string): Observable<{ [key: string]: number }> {
    return this.http.get<CurrencyResponse>(`${this.apiUrl}/${baseCurrency}`).pipe(
      map((data: CurrencyResponse) => data.rates),
      catchError(this.handleError<{ [key: string]: number }>('getRates', {}))
    );
  }

  private handleError<T>(operation: string, result: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}