import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { Product } from '../products/interfaces/product.interface';
import { DataService } from '../../shared/services/data.service';

import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';







@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };
  stores : Store[]  = [ ];
  isDelivery = true;
  cart: Product[] = [];

  constructor(
    private dataSvc: DataService,
    private router: Router,
    private shoppingCartSvc: ShoppingCartService,
    private productsSvc: ProductsService
    ) { 
      this.checkIfCartIsEmpty();
    }



  ngOnInit(): void { 
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
   } 

  onSubmit ({ value: formData } : NgForm): void {
   console.log("Guardar", formData);
   const data: Order = {
    ...formData,
    date: this.getCurrentDay(),
    isDelivery: this.isDelivery
   }
   
   this.dataSvc.saveOrder(data)
   .pipe(
    tap(res => console.log('Order ->', res)),
    switchMap(({ id: orderId }) => {
      //const orderId=order.id;
      const details =  this.prepareDetails() ;  /* {} */ 
      return this.dataSvc.saveDetailsOrder({details,orderId});
    }),

    //tap(res => console.log('finish -->', res)),
    tap( ()=> this.router.navigate(['/checkout/thank-you-page'])),
    delay(2000),
    tap(() => this.shoppingCartSvc.resetCart()),

    


   )
   .subscribe();

  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }


  onPickupOrDelivery(value: boolean): void {
    /* console.log(value); */
    this.isDelivery = value;

  }

  private getStores (): void{
    this.dataSvc.getStores()
    .pipe(tap((stores: Store[]) => this.stores = stores))
    .subscribe()
  }

  private prepareDetails(): Details[] {
    //const details: Details[] = [];
    const details: any = [];

    this.cart.forEach((product:Product )=> {
    const { id:productId, name:productName, qty:quantity,stock } = product;
    const updateStock = (stock - quantity);        

    this.productsSvc.updateStock(productId, updateStock)
    .pipe(
      tap(() => details.push({ productId, productName, quantity }))
    )
    .subscribe()

    
       //details.push({productId,productName,quantity});
        

//        console.log("que es este valor --",{productId,productName,quantity});
        

     })


     


/*      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = (stock - quantity);

      this.productsSvc.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, productName, quantity }))
        )
        .subscribe()


    })
    return details; */


    /*     this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = (stock - quantity);

      this.productsSvc.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, productName, quantity }))
        )
        .subscribe()


    })
    return details; */



    return details;

  }
  


  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()



  }



  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => //this.cart=products
        
        {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        }

        )
      )
      .subscribe()
  }




}
