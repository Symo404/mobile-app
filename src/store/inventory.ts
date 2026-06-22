import { create } from 'zustand';
import { products as seed } from '@/src/data/seed';
import { Product } from '@/src/models/inventory';

type InventoryState = {
  products: Product[]; recentSearches: string[]; selectedLocation: string;
  adjustStock: (id: string, delta: number) => void; toggleFavorite: (id: string) => void;
  addRecentSearch: (query: string) => void; setLocation: (location: string) => void;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  products: seed, recentSearches: ['Nordhaus', 'céramique', 'stock faible'], selectedLocation: 'Tous les sites',
  adjustStock: (id, delta) => set((state) => ({ products: state.products.map((p) => p.id !== id ? p : (() => {
    const quantity = Math.max(0, p.quantity + delta);
    return { ...p, quantity, status: quantity === 0 ? 'out' : quantity <= p.minStock ? 'low' : 'healthy', updatedAt: 'À l’instant' };
  })()) })),
  toggleFavorite: (id) => set((state) => ({ products: state.products.map((p) => p.id === id ? { ...p, favorite: !p.favorite } : p) })),
  addRecentSearch: (query) => set((state) => ({ recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5) })),
  setLocation: (selectedLocation) => set({ selectedLocation }),
}));
