import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private readonly apiUrl: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  constructor(private readonly http: HttpClient) {}

  getCryptoData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(10000),
      catchError(this.handleError<any[]>('getCryptoData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}