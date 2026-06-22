import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/src/theme/tokens';
export default function NotFound(){return <View style={s.root}><Text style={s.code}>404</Text><Text style={s.title}>Cette zone est introuvable</Text><Link href="/" style={s.link}>Retour au tableau de bord</Link></View>}
const s=StyleSheet.create({root:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:palette.paper},code:{fontSize:56,fontWeight:'800',color:palette.sage},title:{fontSize:18,fontWeight:'700',color:palette.ink,marginTop:8},link:{fontSize:13,fontWeight:'700',color:palette.sage,marginTop:18}});
