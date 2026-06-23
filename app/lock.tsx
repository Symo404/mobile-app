import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import * as Crypto from 'expo-crypto';
import { useInventoryStore } from '@/src/store/inventory';
import { useSessionStore } from '@/src/store/session';
import { palette } from '@/src/theme/tokens';
export default function Lock(){
 const preferences=useInventoryStore(s=>s.preferences);const unlock=useSessionStore(s=>s.unlock);const[pin,setPin]=useState('');const[error,setError]=useState('');
 const done=()=>{unlock();router.replace('/')};
 const check=async(v:string)=>{const clean=v.replace(/\D/g,'').slice(0,4);setPin(clean);setError('');if(clean.length===4){const hash=await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,clean);if(hash===preferences.pinCode)done();else{setError('Code incorrect');setPin('');Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}}};
 const biometric=async()=>{const result=await LocalAuthentication.authenticateAsync({promptMessage:'Déverrouiller Atelier Inventory'});if(result.success)done()};
 useEffect(()=>{if(!preferences.pinEnabled||!preferences.pinCode)done()},[]);
 return <SafeAreaView style={s.safe}><View style={s.logo}><Ionicons name="cube-outline" size={32} color={palette.sage}/></View><Text style={s.title}>Atelier Inventory</Text><Text style={s.subtitle}>Saisissez votre code pour continuer</Text><TextInput autoFocus value={pin} onChangeText={check} secureTextEntry keyboardType="number-pad" maxLength={4} style={s.input}/><Text style={s.error}>{error}</Text>{preferences.biometric&&<Pressable accessibilityRole="button" accessibilityLabel="Déverrouiller avec la biométrie" onPress={biometric} style={s.bio}><Ionicons name="finger-print" size={25} color={palette.sage}/><Text style={s.bioText}>Utiliser la biométrie</Text></Pressable>}<Text style={s.local}>Vos données restent stockées localement.</Text></SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:palette.paper,alignItems:'center',justifyContent:'center',padding:30},logo:{width:74,height:74,borderRadius:25,backgroundColor:palette.sageSoft,alignItems:'center',justifyContent:'center'},title:{fontSize:25,fontWeight:'800',color:palette.ink,marginTop:20},subtitle:{fontSize:13,color:palette.muted,marginTop:7},input:{width:230,height:66,backgroundColor:'white',borderWidth:1,borderColor:palette.line,borderRadius:20,textAlign:'center',fontSize:28,fontWeight:'800',letterSpacing:18,color:palette.ink,marginTop:28},error:{height:20,fontSize:12,fontWeight:'700',color:palette.red,marginTop:8},bio:{flexDirection:'row',alignItems:'center',gap:9,padding:14},bioText:{fontSize:13,fontWeight:'700',color:palette.sage},local:{position:'absolute',bottom:35,fontSize:10,color:palette.subtle}});
