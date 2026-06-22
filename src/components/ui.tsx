import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radius, shadow, spacing } from '@/src/theme/tokens';

export function ScreenHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <View style={s.header}><View style={{ flex:1 }}>{eyebrow && <Text style={s.eyebrow}>{eyebrow}</Text>}<Text style={s.title}>{title}</Text></View>{action}</View>;
}
export function IconButton({ name, onPress, dark=false }: { name: keyof typeof Ionicons.glyphMap; onPress?:()=>void; dark?:boolean }) {
  return <Pressable onPress={onPress} style={[s.iconButton, dark && { backgroundColor:'#28332E', borderColor:'#34433B' }]}><Ionicons name={name} size={20} color={dark ? palette.white : palette.ink}/></Pressable>;
}
export function Pill({ label, tone='neutral', icon }: { label:string; tone?:'neutral'|'green'|'amber'|'red'; icon?:keyof typeof Ionicons.glyphMap }) {
  const tones = { neutral:[palette.paper,palette.muted], green:[palette.sageSoft,palette.sage], amber:[palette.amberSoft,palette.amber], red:[palette.redSoft,palette.red] } as const;
  return <View style={[s.pill,{backgroundColor:tones[tone][0]}]}>{icon && <Ionicons name={icon} size={13} color={tones[tone][1]}/>}<Text style={[s.pillText,{color:tones[tone][1]}]}>{label}</Text></View>;
}
export function Card({ children, style }: { children:ReactNode; style?:ViewStyle|ViewStyle[] }) { return <View style={[s.card,style]}>{children}</View>; }
export function PrimaryButton({ label, icon, onPress, compact=false }: { label:string; icon?:keyof typeof Ionicons.glyphMap; onPress?:()=>void; compact?:boolean }) {
  return <Pressable onPress={onPress} style={({pressed})=>[s.primary, compact && {paddingVertical:11,paddingHorizontal:14}, pressed&&{opacity:.85}]}>{icon&&<Ionicons name={icon} size={18} color={palette.white}/>}<Text style={s.primaryText}>{label}</Text></Pressable>;
}
export function SectionTitle({ title, action, onPress }: { title:string; action?:string; onPress?:()=>void }) { return <View style={s.section}><Text style={s.sectionTitle}>{title}</Text>{action&&<Pressable onPress={onPress}><Text style={s.sectionAction}>{action}</Text></Pressable>}</View>; }
export function Progress({ value, color=palette.sage }: { value:number; color?:string }) { return <View style={s.track}><View style={[s.fill,{width:`${Math.min(100,value)}%`,backgroundColor:color}]}/></View>; }
export function HeroGlow({ children }: { children:ReactNode }) { return <LinearGradient colors={['#1D2923','#111714']} start={{x:0,y:0}} end={{x:1,y:1}} style={s.hero}>{children}</LinearGradient>; }

const s=StyleSheet.create({
  header:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:22},eyebrow:{fontSize:12,fontWeight:'700',letterSpacing:1.3,color:palette.sage,textTransform:'uppercase',marginBottom:5},title:{fontSize:29,lineHeight:34,fontWeight:'700',letterSpacing:-.8,color:palette.ink},
  iconButton:{width:44,height:44,borderRadius:15,backgroundColor:palette.card,borderWidth:1,borderColor:palette.line,alignItems:'center',justifyContent:'center'},
  pill:{alignSelf:'flex-start',flexDirection:'row',alignItems:'center',gap:5,borderRadius:radius.pill,paddingHorizontal:9,paddingVertical:6},pillText:{fontSize:11,fontWeight:'700'},
  card:{backgroundColor:palette.card,borderRadius:radius.lg,padding:spacing.md,borderWidth:1,borderColor:'#E9ECE6',...shadow},
  primary:{backgroundColor:palette.ink,borderRadius:16,paddingHorizontal:18,paddingVertical:14,flexDirection:'row',gap:8,justifyContent:'center',alignItems:'center'},primaryText:{color:palette.white,fontSize:14,fontWeight:'700'},
  section:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:25,marginBottom:13},sectionTitle:{fontSize:18,fontWeight:'700',color:palette.ink,letterSpacing:-.3},sectionAction:{fontSize:13,fontWeight:'700',color:palette.sage},
  track:{height:6,backgroundColor:'#EDF0EA',borderRadius:99,overflow:'hidden'},fill:{height:'100%',borderRadius:99},hero:{borderRadius:radius.xl,padding:22,overflow:'hidden'},
});
