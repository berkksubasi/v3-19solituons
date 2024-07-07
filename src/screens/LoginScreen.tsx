import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Dummy login implementation
    let role = '';
    if (username === 'admin' && password === 'admin123') {
      role = 'admin';
    } else if (username === 'store1' && password === 'store123') {
      role = 'store';
    } else if (username === 'store2' && password === 'store123') {
      role = 'store';
    } else if (username === 'warehouse1' && password === 'warehouse123') {
      role = 'warehouse';
    } else if (username === 'warehouse2' && password === 'warehouse123') {
      role = 'warehouse';
    } else {
      Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre');
      return;
    }
    navigation.navigate('Home', { role });
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users', {
        name: username,
        email: `${username}@example.com`, 
        password,
      });
      console.log('User created:', response.data);
      Alert.alert('Başarılı', 'Kullanıcı başarıyla oluşturuldu');
    } catch (err) {
      console.error('Error creating user:', err.message);
      Alert.alert('Hata', 'Kullanıcı oluşturulurken bir hata oluştu');
    }
  };

  return (
    <ExpoLinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Svg width="300" height="100" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="rgb(0,0,255)" stopOpacity="1" />
              <Stop offset="100%" stopColor="rgb(0,255,255)" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Text x="10" y="50" fontFamily="Arial" fontSize="20" fill="url(#grad1)">Nebim V3 2019 Mobile Solution</Text>
        </Svg>
        <TextInput
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Giriş Yap" onPress={handleLogin} color="#800080" />
        <Button title="Kullanıcı Oluştur" onPress={createUser} color="#008080" />
      </View>
    </ExpoLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#800080',
  },
});

export default LoginScreen;
