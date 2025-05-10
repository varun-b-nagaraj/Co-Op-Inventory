import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function CurrentInventoryScreen() {
  // Inventory stored in state so we can edit/delete
  const [inventoryData, setInventoryData] = useState([
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
  ]);

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(inventoryData);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // For the edit modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.9)).current;

  // Pill animation
  const widthAnim = useRef(new Animated.Value(48)).current;

  // Stagger animation for list
  const itemAnims = useRef(
    inventoryData.map(() => new Animated.Value(0))
  ).current;

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

  // Filter list
  useEffect(() => {
    const q = query.toLowerCase();
    setFilteredData(
      inventoryData.filter(
        it =>
          it.sku.includes(q) ||
          it.name.toLowerCase().includes(q)
      )
    );
  }, [query, inventoryData]);

  // Open / close search pill
  const openSearch = () => {
    Animated.timing(widthAnim, {
      toValue: 240,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setIsSearchOpen(true));
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
    Animated.timing(widthAnim, {
      toValue: 48,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setQuery('');
      Keyboard.dismiss();
    });
  };

  // Show edit modal
  const handleEdit = (item) => {
    setCurrentEditItem({ ...item });
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Save changes
  const handleSave = () => {
    setInventoryData(prev =>
      prev.map(i => (i.id === currentEditItem.id ? currentEditItem : i))
    );
    closeModal();
  };

  // Delete item
  const handleDelete = () => {
    setInventoryData(prev =>
      prev.filter(i => i.id !== currentEditItem.id)
    );
    closeModal();
  };

  // Close modal
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setCurrentEditItem(null);
    });
  };

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
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleEdit(item)}
                >
                  <View style={globalStyles.itemBox}>
                    <Text style={[globalStyles.itemTitle, { fontSize: 18 }]}>
                      SKU: {item.sku} | {item.name}
                    </Text>
                    <Text style={[globalStyles.itemSub, { fontSize: 16 }]}>
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </View>

      {/* Search pill */}
      <Animated.View style={[styles.searchContainer, { width: widthAnim }]}>
        {isSearchOpen && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search SKU or name"
            placeholderTextColor="#ddd"
            value={query}
            onChangeText={setQuery}
            autoFocus
            onBlur={closeSearch}
          />
        )}
        <TouchableOpacity
          style={styles.searchIconTouch}
          onPress={isSearchOpen ? closeSearch : openSearch}
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent>
        <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]} />
        <View style={styles.modalWrapper}>
          <Animated.View style={[styles.modalContainer, { transform: [{ scale: modalScale }] }]}>
            <Text style={styles.modalTitle}>Manual Edit</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="SKU"
              value={currentEditItem?.sku}
              onChangeText={text => setCurrentEditItem(prev => ({ ...prev, sku: text }))}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              value={currentEditItem?.name}
              onChangeText={text => setCurrentEditItem(prev => ({ ...prev, name: text }))}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Quantity"
              keyboardType="numeric"
              value={currentEditItem?.quantity.toString()}
              onChangeText={text =>
                setCurrentEditItem(prev => ({
                  ...prev,
                  quantity: parseInt(text, 10) || 0,
                }))
              }
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[globalStyles.buttonSecondary, { flex: 1, marginRight: 5 }]}
                onPress={handleDelete}
              >
                <Text style={globalStyles.buttonTextSecondary}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.buttonPrimary, { flex: 1, marginLeft: 5 }]}
                onPress={handleSave}
              >
                <Text style={globalStyles.buttonTextPrimary}>Save</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    height: 48,
    backgroundColor: '#8A1C1C',
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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
});