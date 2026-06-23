import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { products as seed } from '@/src/data/seed';
import { Product, StockMovement } from '@/src/models/inventory';

type Preferences = {
  darkMode: boolean; biometric: boolean; pinEnabled: boolean; pinCode?: string; ocrLanguages: string[];
  autoBackup: boolean; aiModel: 'MobileCLIP' | 'EfficientNet Lite'; lastBackup?: string;
};

type InventoryState = {
  products: Product[]; movements: StockMovement[]; recentSearches: string[]; recentlyViewed: string[];
  selectedLocation: string; preferences: Preferences; hydrated: boolean;
  adjustStock: (id: string, delta: number, note?: string) => void;
  moveStock: (id: string, type: StockMovement['type'], quantity: number, note?: string, toLocation?: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void; toggleFavorite: (id: string) => void;
  addProduct: (product: Product) => void;
  archiveProduct: (id: string) => void; deleteProduct: (id: string) => void;
  replaceProducts: (products: Product[]) => void;
  addRecentSearch: (query: string) => void; clearRecentSearches: () => void; viewProduct: (id:string) => void;
  setLocation: (location: string) => void; updatePreferences: (updates: Partial<Preferences>) => void;
  recordBackup: () => void; resetDemo: () => void;
};

const statusFor = (quantity:number,minStock:number):Product['status'] => quantity===0?'out':quantity<=minStock?'low':'healthy';
const newMovement = (productId:string,type:StockMovement['type'],quantity:number,note?:string,toLocation?:string):StockMovement => ({ id:`mov-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,productId,type,quantity,createdAt:new Date().toISOString(),note,toLocation });
const memoryStorage={getItem:async(_name:string)=>null,setItem:async(_name:string,_value:string)=>{},removeItem:async(_name:string)=>{}};
const safeStorage=createJSONStorage(()=>Platform.OS==='web'&&typeof window==='undefined'?memoryStorage:AsyncStorage);

export const useInventoryStore = create<InventoryState>()(persist((set) => ({
  products: seed, movements: [], recentSearches: ['Nordhaus', 'céramique', 'stock faible'], recentlyViewed: [], selectedLocation: 'Tous les sites', hydrated:false,
  preferences:{darkMode:false,biometric:false,pinEnabled:false,ocrLanguages:['Français','Anglais','Arabe'],autoBackup:true,aiModel:'MobileCLIP'},
  adjustStock:(id,delta,note)=>set(state=>({products:state.products.map(p=>p.id===id?{...p,quantity:Math.max(0,p.quantity+delta),status:statusFor(Math.max(0,p.quantity+delta),p.minStock),updatedAt:'À l’instant'}:p),movements:[newMovement(id,delta>=0?'in':'out',Math.abs(delta),note),...state.movements]})),
  moveStock:(id,type,quantity,note,toLocation)=>set(state=>({products:state.products.map(p=>{if(p.id!==id)return p;const next=type==='in'?p.quantity+quantity:type==='out'?Math.max(0,p.quantity-quantity):p.quantity;return{...p,quantity:next,status:statusFor(next,p.minStock),location:type==='transfer'&&toLocation?toLocation:p.location,updatedAt:'À l’instant'}}),movements:[newMovement(id,type,quantity,note,toLocation),...state.movements]})),
  updateProduct:(id,updates)=>set(state=>({products:state.products.map(p=>p.id===id?{...p,...updates,status:statusFor(updates.quantity??p.quantity,updates.minStock??p.minStock),updatedAt:'À l’instant'}:p)})),
  addProduct:product=>set(state=>({products:[product,...state.products]})),
  toggleFavorite:id=>set(state=>({products:state.products.map(p=>p.id===id?{...p,favorite:!p.favorite}:p)})),
  archiveProduct:id=>set(state=>({products:state.products.filter(p=>p.id!==id)})), deleteProduct:id=>set(state=>({products:state.products.filter(p=>p.id!==id),movements:state.movements.filter(m=>m.productId!==id)})),
  replaceProducts:products=>set({products}),
  addRecentSearch:query=>set(state=>({recentSearches:query.trim()?[query.trim(),...state.recentSearches.filter(q=>q!==query.trim())].slice(0,8):state.recentSearches})), clearRecentSearches:()=>set({recentSearches:[]}),
  viewProduct:id=>set(state=>({recentlyViewed:[id,...state.recentlyViewed.filter(x=>x!==id)].slice(0,12)})), setLocation:selectedLocation=>set({selectedLocation}),
  updatePreferences:updates=>set(state=>({preferences:{...state.preferences,...updates}})), recordBackup:()=>set(state=>({preferences:{...state.preferences,lastBackup:new Date().toISOString()}})),
  resetDemo:()=>set({products:seed,movements:[],recentSearches:[],recentlyViewed:[]}),
}),{name:'atelier-inventory-v2',storage:safeStorage,partialize:s=>({products:s.products,movements:s.movements,recentSearches:s.recentSearches,recentlyViewed:s.recentlyViewed,selectedLocation:s.selectedLocation,preferences:s.preferences}),onRehydrateStorage:()=>()=>useInventoryStore.setState({hydrated:true})}));
