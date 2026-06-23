import 'react-native-reanimated';
import { useEffect } from 'react';
import { router, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { migrateDatabase } from '@/src/database/client';
import { palette } from '@/src/theme/tokens';
import { useInventoryStore } from '@/src/store/inventory';
import { useSessionStore } from '@/src/store/session';

const queryClient = new QueryClient({ defaultOptions:{queries:{staleTime:60_000,retry:1}} });
export default function RootLayout(){
  useEffect(()=>{ migrateDatabase().catch(()=>{}); },[]);
  const preferences=useInventoryStore(s=>s.preferences);const hydrated=useInventoryStore(s=>s.hydrated);const unlocked=useSessionStore(s=>s.unlocked);const segments=useSegments();
  useEffect(()=>{if(hydrated&&preferences.pinEnabled&&preferences.pinCode&&!unlocked&&segments[0]!=='lock'&&segments[0]!=='pin')router.replace('/lock' as any)},[hydrated,preferences.pinEnabled,preferences.pinCode,unlocked,segments]);
  return <GestureHandlerRootView style={{flex:1}}><QueryClientProvider client={queryClient}><StatusBar style="dark"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:palette.paper},animation:'fade_from_bottom'}}><Stack.Screen name="(tabs)"/><Stack.Screen name="lock" options={{gestureEnabled:false}}/><Stack.Screen name="pin" options={{presentation:'modal'}}/><Stack.Screen name="product/[id]" options={{presentation:'modal'}}/><Stack.Screen name="product/edit/[id]" options={{presentation:'modal'}}/><Stack.Screen name="movement" options={{presentation:'modal'}}/><Stack.Screen name="notifications" options={{presentation:'modal'}}/><Stack.Screen name="compare" options={{presentation:'modal'}}/><Stack.Screen name="settings"/></Stack></QueryClientProvider></GestureHandlerRootView>;
}
