import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { InventoryProvider } from './context/InventoryContext';

import HomeScreen from './screens/HomeScreen';
import AutoInventoryScreen from './screens/AutoInventoryScreen';
import CurrentInventoryScreen from './screens/CurrentInventoryScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#741414',
        tabBarInactiveTintColor: 'gray',
        // shift every tab icon down by 4px
        tabBarIconStyle: { marginTop: 10 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Auto') {
            iconName = 'camera-outline';
          } else if (route.name === 'Current') {
            iconName = 'list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Auto" component={AutoInventoryScreen} />
      <Tab.Screen name="Current" component={CurrentInventoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </InventoryProvider>
  );
}
