import { CalcRowInput } from "./interfaces/calc-row-input";

export class CalcRowInputClass implements CalcRowInput {
    date: string;
    km: number;
    liters: number;
    price: number;
    priceLiter: number;

    constructor(date: string, km: number, liters: number, price: number, priceLiter: number) {
        this.date = date;
        this.km = km;
        this.liters = liters;
        this.price = price;
        this.priceLiter = priceLiter;
    }
}
