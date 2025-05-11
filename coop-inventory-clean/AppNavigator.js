import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ManualInventoryScreen from '../screens/ManualInventoryScreen';
import CurrentInventoryScreen from '../screens/CurrentInventoryScreen';
import AutoInventoryScreen from '../screens/AutoInventoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ManualInventory" component={ManualInventoryScreen} />
        <Stack.Screen name="CurrentInventory" component={CurrentInventoryScreen} />
        <Stack.Screen name="AutoInventoryScan" component={AutoInventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
