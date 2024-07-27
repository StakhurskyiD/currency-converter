// src/app/services/currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyResponse } from '../models/currency-responce';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

  constructor(private http: HttpClient) {}

  getRates(base: string = 'USD'): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`${this.apiUrl}${base}`);
  }
}