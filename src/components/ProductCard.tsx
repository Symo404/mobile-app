import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Product } from '@/src/models/inventory';
import { palette, radius } from '@/src/theme/tokens';
import { Pill } from './ui';

export function ProductCard({ product, compact=false }: { product:Product; compact?:boolean }) {
  const tone=product.status==='healthy'?'green':product.status==='low'?'amber':'red';
  const label=product.status==='healthy'?'En stock':product.status==='low'?'Stock faible':'Épuisé';
  return <Pressable onPress={()=>router.push(`/product/${product.id}`)} style={({pressed})=>[s.card,compact&&s.compact,pressed&&{transform:[{scale:.985}]}]}>
    <Image source={product.image} style={[s.image,compact&&s.compactImage]} contentFit="cover" transition={250}/>
    <View style={s.content}><View style={s.top}><Pill label={label} tone={tone}/>{product.favorite&&<Ionicons name="bookmark" size={16} color={palette.sage}/>}</View>
      <Text style={s.name} numberOfLines={2}>{product.name}</Text><Text style={s.meta}>{product.brand} · {product.sku}</Text>
      <View style={s.bottom}><Text style={s.qty}>{product.quantity} <Text style={s.unit}>unités</Text></Text>{product.similarity!=null&&<Text style={s.match}>{Math.round(product.similarity*100)}% similaire</Text>}</View>
    </View></Pressable>;
}
const s=StyleSheet.create({card:{width:218,backgroundColor:palette.card,borderRadius:22,borderWidth:1,borderColor:palette.line,overflow:'hidden'},compact:{width:'100%',flexDirection:'row',height:126},image:{width:'100%',height:132,backgroundColor:palette.paper},compactImage:{width:118,height:'100%'},content:{padding:14,flex:1},top:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},name:{fontSize:15,fontWeight:'700',lineHeight:20,color:palette.ink,marginTop:10},meta:{fontSize:11,color:palette.muted,marginTop:3},bottom:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginTop:'auto',paddingTop:11},qty:{fontSize:18,fontWeight:'800',color:palette.ink},unit:{fontSize:11,fontWeight:'500',color:palette.muted},match:{fontSize:11,fontWeight:'700',color:palette.sage,backgroundColor:palette.sageSoft,padding:6,borderRadius:radius.pill}});
