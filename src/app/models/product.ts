export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  brand: string;
  type?: string;
  quantityInStock?: number;
}
