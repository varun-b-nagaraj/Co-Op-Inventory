import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.iconWrapper}>
        <MaterialCommunityIcons name="archive" size={80} color="white" />
      </View>

      <Text style={globalStyles.title}>School Store</Text>
      <Text style={globalStyles.subtitle}>Inventory Management</Text>

      <TouchableOpacity
        style={globalStyles.buttonPrimary}
        onPress={() => navigation.navigate('ManualInventory')}
      >
        <Entypo name="plus" size={20} color="#7a0c0c" />
        <Text style={globalStyles.buttonTextPrimary}> New Inventory Count</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonSecondary}
        onPress={() => navigation.navigate('CurrentInventory')}
      >
        <Entypo name="list" size={20} color="#7a0c0c" />
        <Text style={globalStyles.buttonTextSecondary}> View Current Inventory</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonSecondary}
        onPress={() => navigation.navigate('AutoInventoryScan')}
      >
        <MaterialCommunityIcons name="eyedropper-variant" size={20} color="#7a0c0c" />
        <Text style={globalStyles.buttonTextSecondary}> Automatic Color Scan</Text>
      </TouchableOpacity>
    </View>
  );
}
