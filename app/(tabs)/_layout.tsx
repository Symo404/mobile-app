import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, View } from 'react-native';
import { palette } from '@/src/theme/tokens';
const tabs=[['index','grid-outline','grid'],['inventory','cube-outline','cube'],['scan','scan-outline','scan'],['search','search-outline','search'],['analytics','stats-chart-outline','stats-chart']] as const;
export default function TabsLayout(){return <Tabs screenOptions={{headerShown:false,tabBarShowLabel:false,tabBarActiveTintColor:palette.sage,tabBarInactiveTintColor:'#8D9690',tabBarStyle:s.bar}}>{tabs.map(([name,off,on],i)=><Tabs.Screen key={name} name={name} options={{tabBarIcon:({focused,color})=>i===2?<View style={s.scan}><Ionicons name="scan" size={25} color="white"/></View>:<Ionicons name={focused?on:off} size={22} color={color}/>}}/>)}</Tabs>}
const s=StyleSheet.create({bar:{height:Platform.OS==='ios'?88:72,paddingTop:10,paddingBottom:Platform.OS==='ios'?24:12,backgroundColor:'#FFFFFFF5',borderTopColor:palette.line},scan:{width:54,height:54,borderRadius:19,backgroundColor:palette.ink,alignItems:'center',justifyContent:'center',marginTop:-24,shadowColor:'#18211D',shadowOpacity:.25,shadowRadius:12,shadowOffset:{width:0,height:7},elevation:7}});
