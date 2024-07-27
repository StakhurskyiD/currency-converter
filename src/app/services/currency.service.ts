import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CurrencyResponse } from '../models/currency-responce';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

  constructor(private http: HttpClient) {}

  getRates(base: string = 'USD'): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`${this.apiUrl}${base}`).pipe(
      timeout(5000), // Set a timeout for the API call
      catchError(err => {
        console.error('Error fetching rates:', err);
        return of({ rates: {}, base, date: '' } as CurrencyResponse); // Return a fallback response
      })
    );
  }
}