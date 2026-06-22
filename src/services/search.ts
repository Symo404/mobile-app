import Fuse from 'fuse.js';
import { Product } from '@/src/models/inventory';

export function searchProducts(products: Product[], query: string) {
  if (!query.trim()) return products;
  const fuse = new Fuse(products, { keys:['name','brand','sku','barcode','category','color','material'], threshold:0.34, ignoreLocation:true });
  return fuse.search(query).map((result) => result.item);
}
