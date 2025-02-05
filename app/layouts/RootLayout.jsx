import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="(home)" /> 
      <Stack.Screen name="auth" /> 
      <Stack.Screen name = "layouts" />
    </Stack>
  ) 
}
