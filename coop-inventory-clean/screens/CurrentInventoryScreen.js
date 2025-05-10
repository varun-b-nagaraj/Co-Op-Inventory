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
    { id: '2', sku: '67890', name: 'T-Shirt', quantity: 20 },
    { id: '3', sku: '54321', name: 'Hat', quantity: 15 },
    { id: '4', sku: '98765', name: 'Socks', quantity: 30 },
    { id: '5', sku: '11223', name: 'Jacket', quantity: 5 },
    { id: '6', sku: '44556', name: 'Shorts', quantity: 12 },
    { id: '7', sku: '77889', name: 'Pants', quantity: 8 },
    { id: '8', sku: '99001', name: 'Shoes', quantity: 25 },
    { id: '9', sku: '22334', name: 'Belt', quantity: 18 },
    { id: '10', sku: '55667', name: 'Scarf', quantity: 22 },
    { id: '11', sku: '88990', name: 'Gloves', quantity: 14 },
    { id: '12', sku: '33445', name: 'Sweater', quantity: 9 },
    { id: '13', sku: '66778', name: 'Raincoat', quantity: 6 },
    { id: '14', sku: '99002', name: 'Flip Flops', quantity: 20 },
    { id: '15', sku: '22335', name: 'Backpack', quantity: 11 },
  ];

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(inventoryData);
  const [isOpen, setIsOpen] = useState(false);

  // pill expands from 48 → 240
  const widthAnim = useRef(new Animated.Value(48)).current;
  // one Animated.Value per list item
  const itemAnims = useRef(
    inventoryData.map(() => new Animated.Value(0))
  ).current;

  // stagger pop-in on mount
  useEffect(() => {
    Animated.stagger(
      100,
      itemAnims.map(av =>
        Animated.timing(av, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // filter list as user types
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

  // open pill (then show text input)
  const openSearch = () => {
    Animated.timing(widthAnim, {
      toValue: 240,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setIsOpen(true));
  };

  // close pill (hide input, then collapse)
  const closeSearch = () => {
    setIsOpen(false);
    Animated.timing(widthAnim, {
      toValue: 48,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setQuery('');
      Keyboard.dismiss();
    });
  };

  return (
    // ANY touch inside this container will fire onTouchStart
    <View
      style={[globalStyles.container, globalStyles.inventoryContainer]}
      onTouchStart={() => {
        if (isOpen) closeSearch();
      }}
    >
      {/* Header */}
      <View style={globalStyles.headerBox}>
        <Text style={[globalStyles.title, globalStyles.textCenter]}>
          Current Inventory
        </Text>
        <Text style={[globalStyles.subtitle, globalStyles.textCenter]}>
          View all items in stock
        </Text>
      </View>

      {/* Scrollable, animated list */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          keyExtractor={it => it.id}
          showsVerticalScrollIndicator
          contentContainerStyle={globalStyles.inventoryListPadding}
          style={styles.flatList}
          renderItem={({ item, index }) => {
            const anim = itemAnims[index] || new Animated.Value(1);
            return (
              <Animated.View
                style={{
                  opacity: anim,
                  transform: [{ scale: anim }],
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
            );
          }}
        />
      </View>

      {/* Single animated pill → expands then reveals TextInput */}
      <Animated.View
        style={[
          styles.searchContainer,
          { width: widthAnim },
        ]}
      >
        {isOpen && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search SKU or name"
            placeholderTextColor="#ddd"
            value={query}
            onChangeText={setQuery}
            onBlur={closeSearch}
            autoFocus
          />
        )}
        <TouchableOpacity
          style={styles.searchIconTouch}
          onPress={isOpen ? closeSearch : openSearch}
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // make this fill remaining space under header
  listContainer: {
    flex: 1,
    width: '100%',
  },
  // give FlatList itself flex:1 so it can scroll
  flatList: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    height: 48,
    backgroundColor: '#8A1C1C', // custom maroon
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 12,
  },
  searchIconTouch: {
    position: 'absolute',
    right: 0,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
