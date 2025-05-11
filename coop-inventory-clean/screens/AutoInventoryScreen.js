import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Animated,
  Pressable,
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
    { id: '6', sku: '55555', name: 'Ruler', quantity: 6 },
    { id: '7', sku: '66666', name: 'Stapler', quantity: 1 },
    { id: '8', sku: '77777', name: 'Tape', quantity: 3 },
    { id: '9', sku: '88888', name: 'Scissors', quantity: 2 },
    { id: '10', sku: '99999', name: 'Glue Stick', quantity: 4 },
    { id: '11', sku: '10101', name: 'Highlighter', quantity: 5 },
    { id: '12', sku: '12121', name: 'Marker', quantity: 2 },
    { id: '13', sku: '13131', name: 'Colored Pencils', quantity: 3 },
    { id: '14', sku: '14141', name: 'Crayons', quantity: 4 },
    { id: '15', sku: '15151', name: 'Whiteboard Marker', quantity: 1 },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [animatedValues, setAnimatedValues] = useState([]);
  
  // Animation values for screen elements
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const scannedBoxAnimation = useRef(new Animated.Value(0)).current;
  const buttonsAnimation = useRef(new Animated.Value(0)).current;
  
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.9)).current;

  // Initial screen animations on mount
  useEffect(() => {
    const animationSequence = Animated.stagger(150, [
      Animated.spring(headerAnimation, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scannedBoxAnimation, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(buttonsAnimation, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]);
    
    animationSequence.start();
  }, []);

  useEffect(() => {
    const values = scannedItems.map(() => new Animated.Value(0));
    setAnimatedValues(values);
    
    // Stagger the list item animations
    const animations = values.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 50, // Reduced delay for faster overall animation
        useNativeDriver: true,
      })
    );
    
    Animated.stagger(30, animations).start();
  }, []);

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
      })
    ]).start();
  };

  const saveEditItem = () => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.id === currentEditItem.id ? currentEditItem : item
      )
    );
    closeModal();
  };

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
      })
    ]).start(() => setEditModalVisible(false));
  };

  const BouncePressable = ({ onPress, children, style }) => {
    const scale = useRef(new Animated.Value(1)).current;

    return (
      <Pressable
        onPressIn={() => Animated.spring(scale, { toValue: 0.95, friction: 5, useNativeDriver: true }).start()}
        onPressOut={() => {
          Animated.sequence([
            Animated.spring(scale, { toValue: 1.05, friction: 3, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true })
          ]).start(() => onPress());
        }}
      >
        <Animated.View style={[style, { transform: [{ scale }] }]}>
          {children}
        </Animated.View>
      </Pressable>
    );
  };

  const AnimatedIconButton = ({ icon, color, onPress, style }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    
    const handlePress = () => {
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start(() => onPress());
    };
    
    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '20deg']
    });
    
    return (
      <TouchableOpacity onPress={handlePress} style={style}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          {icon === 'edit' ? (
            <Feather name="edit-3" size={18} color={color} />
          ) : (
            <Ionicons name="trash-outline" size={18} color={color} />
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handleOpenCamera = () => {
    console.log('Open Camera');
  };

  const handleUpload = () => {
    console.log('Upload Scanned Items');
  };

  return (
    <View style={[globalStyles.container, globalStyles.inventoryContainer]}>
      <Animated.View 
        style={[
          globalStyles.headerBox, 
          { 
            opacity: headerAnimation,
            transform: [
              { translateY: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0]
              })},
              { scale: headerAnimation }
            ] 
          }
        ]}
      >
        <Text style={[globalStyles.title, globalStyles.textCenter]}>Auto Scan</Text>
        <Text style={[globalStyles.subtitle, globalStyles.textCenter]}>Scan items continuously</Text>
      </Animated.View>

      <Animated.View 
        style={[
          styles.scannedBox, 
          { 
            opacity: scannedBoxAnimation,
            transform: [
              { translateY: scannedBoxAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
              })},
              { scale: scannedBoxAnimation }
            ] 
          }
        ]}
      >
        <View style={styles.headerRow}>
          <Text style={[globalStyles.itemTitle, { marginBottom: 7 }]}>Currently Scanned</Text>
          <AnimatedIconButton 
            icon="trash" 
            color="#741414" 
            onPress={handleConfirmDeleteAll} 
            style={styles.iconButton}
          />
        </View>

        <FlatList
          data={scannedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View style={{
              opacity: animatedValues[index] || new Animated.Value(1),
              transform: [
                { scale: animatedValues[index] || new Animated.Value(1) },
                { translateX: animatedValues[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  }) || 0 }
              ],
            }}>
              <View style={[globalStyles.itemBox, styles.itemRow]}>
                <View style={{ flex: 1 }}>
                  <Text style={[globalStyles.itemTitle, { fontSize: 18 }]}>SKU: {item.sku} | {item.name}</Text>
                  <Text style={globalStyles.itemSub}>Quantity: {item.quantity}</Text>
                </View>
                <AnimatedIconButton 
                  icon="edit" 
                  color="#741414" 
                  onPress={() => handleEditItem(item)} 
                  style={styles.iconButton}
                />
                <AnimatedIconButton 
                  icon="trash" 
                  color="#741414" 
                  onPress={() => handleDeleteItem(item.id)} 
                  style={styles.iconButton}
                />
              </View>
            </Animated.View>
          )}
        />
      </Animated.View>

      <Animated.View 
        style={[
          styles.buttonRow, 
          { 
            opacity: buttonsAnimation,
            transform: [
              { translateY: buttonsAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
              })}
            ] 
          }
        ]}
      >
        <BouncePressable onPress={handleOpenCamera} style={[globalStyles.buttonSecondary, styles.halfButton]}>
          <Text style={globalStyles.buttonTextSecondary}>Open Camera</Text>
        </BouncePressable>
        <BouncePressable onPress={handleUpload} style={[globalStyles.buttonPrimary, styles.halfButton]}>
          <Text style={globalStyles.buttonTextPrimary}>Upload</Text>
        </BouncePressable>
      </Animated.View>

      <Modal visible={editModalVisible} transparent>
        <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]} />
        <View style={styles.modalOverlayWrapper}>
          <Animated.View 
            style={[
              styles.modalContainer, 
              { 
                transform: [
                  { scale: modalScale },
                  { translateY: modalScale.interpolate({
                      inputRange: [0.9, 1],
                      outputRange: [30, 0]
                  })}
                ] 
              }
            ]}
          >
            <Text style={globalStyles.title}>Edit Item</Text>
            <TextInput
              placeholder="SKU"
              value={currentEditItem?.sku}
              onChangeText={(text) => setCurrentEditItem((prev) => ({ ...prev, sku: text }))}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Name"
              value={currentEditItem?.name}
              onChangeText={(text) => setCurrentEditItem((prev) => ({ ...prev, name: text }))}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Quantity"
              value={currentEditItem?.quantity.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setCurrentEditItem((prev) => ({ ...prev, quantity: parseInt(text) || 0 }))}
              style={styles.modalInput}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={[globalStyles.buttonSecondary, { flex: 1, marginRight: 5 }]} onPress={closeModal}>
                <Text style={globalStyles.buttonTextSecondary}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.buttonPrimary, { flex: 1, marginLeft: 5 }]} onPress={saveEditItem}>
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
    marginHorizontal: 0,
  },
  iconButton: {
    marginLeft: 8,
    padding: 6,
  },
  buttonRow: {
    position: 'absolute',
    bottom: 24,
    left: 17,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  halfButton: {
    width: '80%',
    marginHorizontal: 10,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOverlayWrapper: {
    flex: 1,
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