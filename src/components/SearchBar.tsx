import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/src/theme/tokens';
export function SearchBar({ value, onChangeText, onCamera, placeholder='Produit, SKU, code-barres…' }: { value:string; onChangeText:(v:string)=>void; onCamera?:()=>void; placeholder?:string }) {
 return <View style={s.box}><Ionicons name="search" size={20} color={palette.muted}/><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={palette.subtle} style={s.input}/>{onCamera&&<Pressable onPress={onCamera} style={s.camera}><Ionicons name="camera-outline" size={20} color={palette.sage}/></Pressable>}</View>;
}
const s=StyleSheet.create({box:{height:54,backgroundColor:palette.card,borderWidth:1,borderColor:palette.line,borderRadius:18,flexDirection:'row',alignItems:'center',paddingHorizontal:16,gap:10},input:{flex:1,fontSize:14,color:palette.ink},camera:{width:34,height:34,borderRadius:11,alignItems:'center',justifyContent:'center',backgroundColor:palette.sageSoft}});
