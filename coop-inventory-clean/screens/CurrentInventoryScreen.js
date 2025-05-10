import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function CurrentInventoryScreen() {
  const inventoryData = [
    { id: '1', sku: '12345', quantity: 10 },
    { id: '2', sku: '67890', quantity: 5 },
  ];

  return (
    <View style={[globalStyles.container, { justifyContent: 'flex-start', paddingTop: 100 }]}>
      {/* Header Box */}
      <View
        style={{
          backgroundColor: '#8c1a1a',
          borderRadius: 15,
          paddingVertical: 20,
          paddingHorizontal: 20,
          marginBottom: 30,
          width: '90%',
          alignItems: 'center',
        }}
      >
        <Text style={[globalStyles.title, { textAlign: 'center', marginBottom: 4 }]}>
          Current Inventory
        </Text>
        <Text style={[globalStyles.subtitle, { textAlign: 'center', marginBottom: 0 }]}>
          View all items in stock
        </Text>
      </View>

      {/* Inventory List */}
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={inventoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 16,
              marginHorizontal: 20,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#741414' }}>
              SKU: {item.sku}
            </Text>
            <Text style={{ fontSize: 14, color: '#444' }}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}
