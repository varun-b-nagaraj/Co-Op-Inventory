import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function AutoInventoryScreen() {
  const [scannedItems, setScannedItems] = useState([
    { id: '1', sku: '98765', name: 'Notebook', quantity: 1 },
    { id: '2', sku: '54321', name: 'Lanyard', quantity: 3 },
    { id: '3', sku: '22222', name: 'Pen', quantity: 5 },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  const handleConfirmDeleteAll = () => {
    Alert.alert(
      'Clear Scanned Items?',
      'This will permanently discard all scanned data.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete All', style: 'destructive', onPress: () => setScannedItems([]) },
      ]
    );
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Delete Item?',
      'This item will be removed from the scan list.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setScannedItems((prev) => prev.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  const handleEditItem = (item) => {
    setCurrentEditItem({ ...item });
    setEditModalVisible(true);
  };

  const saveEditItem = () => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.id === currentEditItem.id ? currentEditItem : item
      )
    );
    setEditModalVisible(false);
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
          <Text style={[globalStyles.itemTitle, { marginBottom: 7 }]}>Currently Scanned</Text>
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
               <Text style={[globalStyles.itemTitle, { fontSize: 18 }]}>
                  SKU: {item.sku} | {item.name}
                </Text>
                <Text style={globalStyles.itemSub}>Quantity: {item.quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => handleEditItem(item)} style={styles.iconButton}>
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

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={globalStyles.title}>Edit Item</Text>
            <TextInput
              placeholder="SKU"
              value={currentEditItem?.sku}
              onChangeText={(text) =>
                setCurrentEditItem((prev) => ({ ...prev, sku: text }))
              }
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Name"
              value={currentEditItem?.name}
              onChangeText={(text) =>
                setCurrentEditItem((prev) => ({ ...prev, name: text }))
              }
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Quantity"
              value={currentEditItem?.quantity.toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                setCurrentEditItem((prev) => ({
                  ...prev,
                  quantity: parseInt(text) || 0,
                }))
              }
              style={styles.modalInput}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[globalStyles.buttonSecondary, { flex: 1, marginRight: 5 }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={globalStyles.buttonTextSecondary}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.buttonPrimary, { flex: 1, marginLeft: 5 }]}
                onPress={saveEditItem}
              >
                <Text style={globalStyles.buttonTextPrimary}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  padding: 16,
  marginBottom: 12,
  borderRadius: 12,
  backgroundColor: 'white',
  width: '100%',
  marginHorizontal: 0, // remove any side margin if applied elsewhere
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '85%',
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
    marginTop: 10,
  },
});
