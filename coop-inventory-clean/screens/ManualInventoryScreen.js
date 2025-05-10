import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function ManualInventoryScreen() {
  return (
    <View style={globalStyles.container}>
      {/* Icon at top like home screen */}
      <View style={globalStyles.iconWrapper}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={80} color="white" />
      </View>

      {/* Headings */}
      <Text style={globalStyles.title}>Manual Entry</Text>
      <Text style={globalStyles.subtitle}>Manually count items</Text>

      {/* SKU Entry + Camera */}
      <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', marginBottom: 15 }}>
        <TextInput
          placeholder="SKU / Item"
          placeholderTextColor="#888"
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 12,
            marginRight: 10,
            marginTop: 20,
          }}
        />
        <TouchableOpacity style={{ padding: 10, marginTop: 20 }}>
          <Ionicons name="camera-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quantity Entry */}
      <TextInput
        placeholder="Quantity (don’t count twice!)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        style={{
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 12,
          marginBottom: 40,
        }}
      />

      {/* Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
        <TouchableOpacity style={[globalStyles.buttonSecondary, { width: '48%' }]}>
          <Text style={globalStyles.buttonTextSecondary}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[globalStyles.buttonPrimary, { width: '48%' }]}>
          <Text style={globalStyles.buttonTextPrimary}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
