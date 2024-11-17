import { Address } from "./address";
import { OrderItem } from "./orderItem";

export interface Order {
  id: number;
  orderDate: Date;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderStatus: {
    id: number;
    name: string;
  };
  address: Address;
  orderItems: OrderItem[];
}
