import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/componentes/header/services/shopping-cart.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { Product } from '../products/interfaces/product.interface';
import { DataService } from '../products/services/data.service';







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
  isDelivery = false;
  cart: Product[] = [];

  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService
    ) { }



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
    pickup: this.isDelivery
   }
   
   this.dataSvc.saveOrder(data)
   .pipe(
    tap(res => console.log('Order ->', res)),
    switchMap((order) => {
      const orderId=order.id;
      const details =  /* {} */ this.prepareDetails() ;  
      return this.dataSvc.saveDetailsOrder({details,orderId});
    }),

    tap(res => console.log('finish -->', res)),
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
    const details: Details[] = [];
    
      this.cart.forEach(res => {
      console.log(res);
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




}
