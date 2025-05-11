import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
  const navigation = useNavigation();

  // create animated values
  const iconAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const currentBtnAnim = useRef(new Animated.Value(0)).current;
  const autoBtnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // stagger the animations: pop each in with a spring
    Animated.stagger(100, [
      Animated.spring(iconAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.spring(titleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.spring(subtitleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.spring(currentBtnAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.spring(autoBtnAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
    ]).start();
  }, [iconAnim, titleAnim, subtitleAnim, currentBtnAnim, autoBtnAnim]);

  // helper to build style for each animated element
  const popStyle = animValue => ({
    opacity: animValue,
    transform: [{
      scale: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
      })
    }],
  });

  return (
    <View style={globalStyles.container}>
      <Animated.View style={[globalStyles.iconWrapper, popStyle(iconAnim)]}>
        <MaterialCommunityIcons name="archive" size={80} color="white" />
      </Animated.View>

      <Animated.Text style={[globalStyles.title, popStyle(titleAnim)]}>
        RRHS CO-OP
      </Animated.Text>

      <Animated.Text
        style={[
          globalStyles.subtitle,
          { marginBottom: 30 },
          popStyle(subtitleAnim)
        ]}
      >
        Inventory Management
      </Animated.Text>

      <Animated.View style={popStyle(currentBtnAnim)}>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={() => navigation.navigate('Current')}
        >
          <Entypo name="list" size={20} color="#7a0c0c" />
          <Text style={globalStyles.buttonTextSecondary}>
            View Current Inventory
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={popStyle(autoBtnAnim)}>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={() => navigation.navigate('Auto')}
          accessible={true}
          accessibilityLabel="Automatic Inventory Scan"
        >
          <MaterialCommunityIcons
            name="barcode-scan"
            size={20}
            color="#7a0c0c"
          />
          <Text style={globalStyles.buttonTextSecondary}>
            Automatic Inventory Scan
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
