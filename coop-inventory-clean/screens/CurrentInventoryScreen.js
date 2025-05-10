import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function CurrentInventoryScreen() {
  const inventoryData = [
    { id: '1', sku: '12345', name: 'Hoodie', quantity: 10 },
    { id: '2', sku: '67890', name: 'Water Bottle', quantity: 5 },
    { id: '3', sku: '11111', name: 'T-Shirt', quantity: 7 },
  ];

  const [query, setQuery] = useState('');

  const filteredData = inventoryData.filter((item) => {
    const lowerQuery = query.toLowerCase();
    return (
      item.sku.includes(lowerQuery) ||
      item.name.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <View style={[globalStyles.container, globalStyles.inventoryContainer]}>
      {/* Header Box */}
      <View style={globalStyles.headerBox}>
        <Text style={[globalStyles.title, globalStyles.textCenter]}>Current Inventory</Text>
        <Text style={[globalStyles.subtitle, globalStyles.textCenter]}>View all items in stock</Text>
      </View>

      {/* Inventory List */}
      <FlatList
        style={globalStyles.fullWidth}
        contentContainerStyle={globalStyles.inventoryListPadding}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.itemBox}>
            <Text style={globalStyles.itemTitle}>
              SKU: {item.sku} | {item.name}
            </Text>
            <Text style={globalStyles.itemSub}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />

      {/* Search Bar */}
      <View style={globalStyles.searchWrapper}>
        <TextInput
          placeholder="Search SKU or name"
          placeholderTextColor="#999"
          style={globalStyles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
      </View>
    </View>
  );
}
