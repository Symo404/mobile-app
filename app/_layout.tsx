import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { migrateDatabase } from '@/src/database/client';
import { palette } from '@/src/theme/tokens';

const queryClient = new QueryClient({ defaultOptions:{queries:{staleTime:60_000,retry:1}} });
export default function RootLayout(){
  useEffect(()=>{ migrateDatabase().catch(()=>{}); },[]);
  return <GestureHandlerRootView style={{flex:1}}><QueryClientProvider client={queryClient}><StatusBar style="dark"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:palette.paper},animation:'fade_from_bottom'}}><Stack.Screen name="(tabs)"/><Stack.Screen name="product/[id]" options={{presentation:'modal'}}/><Stack.Screen name="settings"/></Stack></QueryClientProvider></GestureHandlerRootView>;
}
