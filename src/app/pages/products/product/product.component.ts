import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interfaces/product.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  //Punto estable,  lo siguiente iniciar con la propirdad CahngeDetection 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent  {
@Input() product!: Product;
@Output() addToCartCick = new EventEmitter<Product>();
  


  onClick(): void{

    /* console.log("Click"); */
    /* console.log("Click",this.product); */
    

    this.addToCartCick.emit(this.product);

  }

}
