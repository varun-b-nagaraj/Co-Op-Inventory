import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function AutoInventoryScreen() {
  const [scannedItems, setScannedItems] = useState([
    { id: '1', sku: '98765', name: 'Notebook', quantity: 1 },
    { id: '2', sku: '54321', name: 'Lanyard', quantity: 3 },
    { id: '3', sku: '22222', name: 'Pen', quantity: 5 },
    { id: '4', sku: '33333', name: 'Pencil', quantity: 2 },
    { id: '5', sku: '44444', name: 'Eraser', quantity: 4 },
    { id: '6', sku: '55555', name: 'Sharpener', quantity: 6 },
    { id: '7', sku: '66666', name: 'Binder', quantity: 8 },
    { id: '8', sku: '77777', name: 'Folder', quantity: 10 },
    { id: '9', sku: '88888', name: 'Sticky Notes', quantity: 12 },
    { id: '10', sku: '99999', name: 'Tape', quantity: 15 },
    { id: '11', sku: '00000', name: 'Glue', quantity: 20 },
    { id: '12', sku: '11111', name: 'Scissors', quantity: 25 },
    { id: '13', sku: '22222', name: 'Highlighter', quantity: 30 },
    { id: '14', sku: '33333', name: 'Marker', quantity: 35 },
    { id: '15', sku: '44444', name: 'Ruler', quantity: 40 },
  ]);

  const handleConfirmDeleteAll = () => {
    Alert.alert(
      'Clear Scanned Items?',
      'This will permanently discard the currently scanned data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setScannedItems([]) },
      ]
    );
  };

  const handleDeleteItem = (id) => {
    setScannedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    Alert.alert('Edit', `Open edit modal for item with ID ${id}`);
    // You can open a modal or inline form here later
  };

  const handleUpload = () => {
    console.log('Uploading:', scannedItems);
  };

  const handleOpenCamera = () => {
    console.log('Opening camera...');
  };

  return (
    <View style={[globalStyles.container, globalStyles.inventoryContainer]}>
      {/* Header */}
      <View style={globalStyles.headerBox}>
        <Text style={[globalStyles.title, globalStyles.textCenter]}>Auto Scan</Text>
        <Text style={[globalStyles.subtitle, globalStyles.textCenter]}>
          Scan items continuously
        </Text>
      </View>

      {/* Scanned Items Box */}
      <View style={styles.scannedBox}>
        <View style={styles.headerRow}>
          <Text style={globalStyles.itemTitle}>Currently Scanned</Text>
          <TouchableOpacity onPress={handleConfirmDeleteAll}>
            <Ionicons name="trash-outline" size={20} color="#741414" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={scannedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[globalStyles.itemBox, styles.itemRow]}>
              <View style={{ flex: 1 }}>
                <Text style={globalStyles.itemTitle}>
                  SKU: {item.sku} | {item.name}
                </Text>
                <Text style={globalStyles.itemSub}>Quantity: {item.quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => handleEditItem(item.id)} style={styles.iconButton}>
                <Feather name="edit-3" size={18} color="#741414" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.iconButton}>
                <Ionicons name="trash-outline" size={18} color="#741414" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[globalStyles.buttonSecondary, styles.halfButton]}
          onPress={handleOpenCamera}
        >
          <Text style={globalStyles.buttonTextSecondary}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.buttonPrimary, styles.halfButton]}
          onPress={handleUpload}
        >
          <Text style={globalStyles.buttonTextPrimary}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scannedBox: {
    width: '90%',
    backgroundColor: '#f1eaea',
    borderRadius: 15,
    padding: 16,
    marginBottom: 30,
    maxHeight: 500,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  iconButton: {
    marginLeft: 8,
    padding: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  halfButton: {
    width: '48%',
  },
});
