import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function CurrentInventoryScreen() {
  const inventoryData = [
    { id: '1', sku: '12345', name: 'Hoodie', quantity: 10 },
    { id: '2', sku: '67890', name: 'Water Bottle', quantity: 5 },
    { id: '3', sku: '11111', name: 'T-Shirt', quantity: 7 },
    { id: '4', sku: '22222', name: 'Cap', quantity: 3 },
    { id: '5', sku: '33333', name: 'Notebook', quantity: 12 },
    { id: '6', sku: '44444', name: 'Pen', quantity: 20 },
    { id: '7', sku: '55555', name: 'Pencil', quantity: 15 },
    { id: '8', sku: '66666', name: 'Eraser', quantity: 8 },
    { id: '9', sku: '77777', name: 'Ruler', quantity: 6 },
    { id: '10', sku: '88888', name: 'Stapler', quantity: 4 },
    { id: '11', sku: '99999', name: 'Tape', quantity: 9 },
    { id: '12', sku: '10101', name: 'Scissors', quantity: 2 },
    { id: '13', sku: '12121', name: 'Glue Stick', quantity: 11 },
    { id: '14', sku: '13131', name: 'Highlighter', quantity: 14 },
    { id: '15', sku: '14141', name: 'Marker', quantity: 1 },
    { id: '16', sku: '15151', name: 'Colored Pencils', quantity: 3 },
    { id: '17', sku: '16161', name: 'Crayons', quantity: 5 },
    { id: '18', sku: '17171', name: 'Whiteboard Marker', quantity: 7 },
  ];

  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredData, setFilteredData] = useState(inventoryData);

  // one Animated.Value per item
  const animatedValues = useRef(inventoryData.map(() => new Animated.Value(0))).current;

  // staggered pop-in on mount
  useEffect(() => {
    Animated.stagger(
      100,
      animatedValues.map(av =>
        Animated.timing(av, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // update filter whenever query changes
  useEffect(() => {
    const q = query.toLowerCase();
    setFilteredData(
      inventoryData.filter(
        it =>
          it.sku.includes(q) ||
          it.name.toLowerCase().includes(q)
      )
    );
  }, [query]);

  return (
    <View style={[globalStyles.container, globalStyles.inventoryContainer]}>
      {/* Header */}
      <View style={globalStyles.headerBox}>
        <Text style={[globalStyles.title, globalStyles.textCenter]}>
          Current Inventory
        </Text>
        <Text style={[globalStyles.subtitle, globalStyles.textCenter]}>
          View all items in stock
        </Text>
      </View>

      {/* Animated, scrollable list */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          nestedScrollEnabled
          showsVerticalScrollIndicator
          contentContainerStyle={globalStyles.inventoryListPadding}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: animatedValues[index] || 1,
                transform: [{ scale: animatedValues[index] || 1 }],
              }}
            >
              <View style={globalStyles.itemBox}>
                <Text style={[globalStyles.itemTitle, { fontSize: 18 }]}>
                  SKU: {item.sku} | {item.name}
                </Text>
                <Text style={[globalStyles.itemSub, { fontSize: 16 }]}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </Animated.View>
          )}
        />
      </View>

      {/* Floating Search */}
      <View style={globalStyles.searchFloatingWrapper}>
        {showSearch ? (
          <TextInput
            placeholder="Search SKU or name"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            onBlur={() => {
              setShowSearch(false);
              setQuery('');
              Keyboard.dismiss();
            }}
            style={[
              globalStyles.searchInputFloating,
              { position: 'absolute', bottom: 7, right: 0 },
            ]}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setShowSearch(true)}>
            <Ionicons name="search" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    maxHeight: 600,
    alignSelf: 'center',
  },
});
