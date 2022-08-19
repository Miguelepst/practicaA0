import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
products!: Product[];

  constructor(private productSvc: ProductsService) { }

  ngOnInit(): void {

    this.productSvc.getProducts()
      .pipe(
        tap((products: Product[] )=> this.products=products)
      )
      .subscribe();


    /* 
    //Mostrar el contenido extraido del API en la consola 
    this.productSvc.getProducts().pipe(tap(res=>console.log(res))).subscribe();
 */
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

}
