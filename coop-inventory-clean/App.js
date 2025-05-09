import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CurrentInventoryScreen from './screens/CurrentInventoryScreen';
import ManualInventoryScreen from './screens/ManualInventoryScreen';
import AutoInventoryScreen from './screens/AutoInventoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#741414',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Current" component={CurrentInventoryScreen} />
        <Stack.Screen name="Manual" component={ManualInventoryScreen} />
        <Stack.Screen name="Auto" component={AutoInventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
