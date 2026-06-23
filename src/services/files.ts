import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';
import { Product, StockMovement } from '@/src/models/inventory';

const escapeCsv=(v:unknown)=>`"${String(v??'').replace(/"/g,'""')}"`;
export async function exportInventory(format:'csv'|'json',products:Product[],movements:StockMovement[]){
 const content=format==='json'?JSON.stringify({version:1,exportedAt:new Date().toISOString(),products,movements},null,2):[
  ['id','name','brand','sku','barcode','category','quantity','minStock','price','location','color','material'].join(','),
  ...products.map(p=>[p.id,p.name,p.brand,p.sku,p.barcode,p.category,p.quantity,p.minStock,p.price,p.location,p.color,p.material].map(escapeCsv).join(','))
 ].join('\n');
 const mime=format==='json'?'application/json':'text/csv'; const filename=`atelier-inventory-${new Date().toISOString().slice(0,10)}.${format}`;
 if(Platform.OS==='web'){const blob=new Blob([content],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);return filename;}
 const uri=`${FileSystem.cacheDirectory}${filename}`;await FileSystem.writeAsStringAsync(uri,content,{encoding:FileSystem.EncodingType.UTF8});
 if(await Sharing.isAvailableAsync())await Sharing.shareAsync(uri,{mimeType:mime,dialogTitle:'Exporter l’inventaire'});return filename;
}

export async function importInventoryJson(){
 const picked=await DocumentPicker.getDocumentAsync({type:'application/json',copyToCacheDirectory:true});if(picked.canceled)return null;
 const text=Platform.OS==='web'?await (await fetch(picked.assets[0].uri)).text():await FileSystem.readAsStringAsync(picked.assets[0].uri);const parsed=JSON.parse(text);
 if(!Array.isArray(parsed.products))throw new Error('Format invalide'); return parsed.products as Product[];
}
