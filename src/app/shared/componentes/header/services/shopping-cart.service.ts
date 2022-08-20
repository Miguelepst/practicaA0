import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable(
    {providedIn:"root"}

)

export class ShoppingCartService {
    //dentro se establecen propiedades y metodos
    //es este caso se va a usar vastante programacion reactiva con rxjs 
    products: Product[] = [];


    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);


    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }

    //devuelve 3 observables




    updateCart(product: Product): void {
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
     }



    private addToCart(product: Product): void {
        this.products.push(product);
        this.cartSubject.next(this.products);
    }

    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
      }


    private calcTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += (prod.price), 0);
        this.totalSubject.next(total);
      }



}