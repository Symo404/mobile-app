import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { IconButton, PrimaryButton, ScreenHeader } from '@/src/components/ui';
import { useInventoryStore } from '@/src/store/inventory';
import { confirm, notify } from '@/src/utils/feedback';
import { palette, spacing } from '@/src/theme/tokens';
export default function PinSetup(){
 const preferences=useInventoryStore(s=>s.preferences);const update=useInventoryStore(s=>s.updatePreferences);const[pin,setPin]=useState('');const[confirmPin,setConfirmPin]=useState('');
 const close=()=>router.canGoBack()?router.back():router.replace('/settings');
 const save=async()=>{if(!/^\d{4}$/.test(pin))return notify('Le code doit contenir exactement 4 chiffres.');if(pin!==confirmPin)return notify('Les deux codes ne correspondent pas.');const hash=await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,pin);update({pinEnabled:true,pinCode:hash});notify('Code PIN activé.');close()};
 const disable=()=>confirm('Désactiver le code PIN ?','L’application ne demandera plus de code au démarrage.',()=>{update({pinEnabled:false,pinCode:undefined});notify('Code PIN désactivé.');close()},true);
 return <SafeAreaView style={s.safe}><ScreenHeader eyebrow="Sécurité locale" title={preferences.pinEnabled?'Modifier le code PIN':'Créer un code PIN'} action={<IconButton name="close" accessibilityLabel="Fermer" onPress={close}/>}/><Text style={s.help}>Choisissez quatre chiffres. Seule leur empreinte chiffrée reste sur cet appareil.</Text><Text style={s.label}>NOUVEAU CODE</Text><TextInput value={pin} onChangeText={v=>setPin(v.replace(/\D/g,'').slice(0,4))} secureTextEntry keyboardType="number-pad" maxLength={4} style={s.input}/><Text style={s.label}>CONFIRMER LE CODE</Text><TextInput value={confirmPin} onChangeText={v=>setConfirmPin(v.replace(/\D/g,'').slice(0,4))} secureTextEntry keyboardType="number-pad" maxLength={4} style={s.input}/><PrimaryButton label="Enregistrer le code" icon="shield-checkmark-outline" onPress={save}/>{preferences.pinEnabled&&<Pressable onPress={disable}><Text style={s.disable}>Désactiver le code PIN</Text></Pressable>}</SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:palette.paper,padding:spacing.lg,maxWidth:600,width:'100%',alignSelf:'center'},help:{fontSize:13,lineHeight:20,color:palette.muted,marginBottom:20},label:{fontSize:10,fontWeight:'800',letterSpacing:1.1,color:palette.muted,marginTop:12,marginBottom:7},input:{height:60,backgroundColor:'white',borderWidth:1,borderColor:palette.line,borderRadius:18,textAlign:'center',fontSize:24,fontWeight:'800',letterSpacing:14,color:palette.ink,marginBottom:10},disable:{textAlign:'center',marginTop:20,fontSize:12,fontWeight:'700',color:palette.red}});
