import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import ManualInventoryScreen from './screens/ManualInventoryScreen';
import CurrentInventoryScreen from './screens/CurrentInventoryScreen';
import AutoInventoryScreen from './screens/AutoInventoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Manual" component={ManualInventoryScreen} />
      <Tab.Screen name="Current" component={CurrentInventoryScreen} />
      <Tab.Screen name="Auto" component={AutoInventoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#741414' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
