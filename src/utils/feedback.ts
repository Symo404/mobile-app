import { Alert, Platform, ToastAndroid } from 'react-native';
export function notify(message:string){if(Platform.OS==='android')ToastAndroid.show(message,ToastAndroid.SHORT);else Alert.alert('Atelier Inventory',message);}
export function confirm(title:string,message:string,onConfirm:()=>void,destructive=false){Alert.alert(title,message,[{text:'Annuler',style:'cancel'},{text:'Confirmer',style:destructive?'destructive':'default',onPress:onConfirm}]);}
