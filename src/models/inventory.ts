export type Category = 'Électroménager' | 'Cuisine' | 'Déco' | 'Vaisselle';
export type StockStatus = 'healthy' | 'low' | 'out';

export interface Product {
  id: string; name: string; brand: string; sku: string; barcode?: string; category: Category;
  quantity: number; minStock: number; price: number; location: string; image: string; color: string;
  material: string; similarity?: number; updatedAt: string; favorite?: boolean; status: StockStatus;
}

export interface StockMovement {
  id: string; productId: string; type: 'in' | 'out' | 'transfer' | 'audit'; quantity: number; createdAt: string; note?: string;
}

export interface ExtractedProduct {
  name: string; brand: string; reference: string; barcode: string; category: Category; color: string;
  material: string; dimensions: string; weight: string; capacity: string; country: string; confidence: number;
}
