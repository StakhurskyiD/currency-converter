import { CurrencyRate } from "./currency-rate";

export interface CurrencyResponse {
    rates: CurrencyRate;
    base: string;
    date: string;
}