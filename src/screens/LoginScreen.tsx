import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

type RootStackParamList = {
  Home: { role: 'admin' | 'store' | 'warehouse' };
};

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { username, password });
      const { user } = response.data;
      if (user && user.role) {
        navigation.navigate('Home', { role: user.role });
      } else {
        Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error('Login error:', err.message);
      } else {
        console.error('Unexpected error:', err);
      }
      Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <ExpoLinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Svg width="300" height="100" viewBox="0 0 300 100" fill="none">
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
