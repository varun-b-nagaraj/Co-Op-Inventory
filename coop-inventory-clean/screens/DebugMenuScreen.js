import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const DEBUG_PASSWORD = '222052';

export default function DebugMenuScreen() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUnlock = () => {
    if (password === DEBUG_PASSWORD) {
      setUnlocked(true);
      setErrorMessage('');
      return;
    }

    setErrorMessage('Incorrect password');
  };

  return (
    <View style={globalStyles.container}>
      {unlocked ? (
        <Text style={styles.welcomeText}>Welcome to the debug menu</Text>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.title}>Debug Menu</Text>
          <Text style={styles.subtitle}>Enter password to continue</Text>
          <TextInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errorMessage) {
                setErrorMessage('');
              }
            }}
            placeholder="Password"
            placeholderTextColor="#7a7a7a"
            secureTextEntry
            keyboardType="numeric"
            style={styles.input}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={[globalStyles.buttonSecondary, styles.unlockButton]}
            onPress={handleUnlock}
          >
            <Text style={globalStyles.buttonTextSecondary}>Unlock</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    width: '90%',
    backgroundColor: '#f1eaea',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#741414',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#741414',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    color: '#741414',
    marginBottom: 8,
  },
  unlockButton: {
    width: '100%',
    marginBottom: 0,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
