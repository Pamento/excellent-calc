import { ExcelentCalcRow } from "./interfaces/excelent-calc-row";

export class CalcRowClass implements ExcelentCalcRow {
    date: string;
    km: number;
    liters: number;
    price: number;
    priceLiter: number;
    kmDone: number;
    liters100km: number;
    kmLiter: number;
    rowStyle: string;

    constructor(date: string, km: number, liters: number, price: number, priceLiter: number, kmDone?: number, rowStyle: string = '') {
        this.date = date;
        this.km = km;
        this.liters = liters;
        this.price = price;
        this.priceLiter = priceLiter; // (price / liters) - to use later
        this.kmDone = kmDone || 0;
        this.liters100km = kmDone !== undefined ? (liters / kmDone) * 100 : 0;
        this.kmLiter = kmDone !== undefined ? kmDone / liters : 0;
        this.rowStyle = '';
    }
}
