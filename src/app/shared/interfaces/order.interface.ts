export interface Details{
    id: number;
    orderId: number;
    quantity: number;
    productName: string;

}


export interface Order{
    id: number;
    name: string;
    date: string;
    shippingAddress: string;
    city: string;
    isDelivery: boolean;
}


export interface DetailsOrder {
    details: Details[];
    orderId: number;
    
  }




  /* export interface DetailsOrder {
    details: Details[];
    orderId: number;
    id?: number;                     //propiedad opcional (?)
  } */
