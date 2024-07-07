import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import { RNCamera } from 'react-native-camera';
import { DeviceEventEmitter } from 'react-native';

const UpdatePriceScreen = () => {
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [scanning, setScanning] = useState<boolean>(false);

  useEffect(() => {
    const handleIntent = (intent: any) => {
      if (intent.action === 'com.zebra.reactnative.ACTION') {
        const scannedData = intent.extras['com.symbol.datawedge.data_string'];
        console.log(`Barkod tarandı: ${scannedData}`);
        setProductId(scannedData);
      }
    };

    DeviceEventEmitter.addListener('onReceive', handleIntent);

    return () => {
      DeviceEventEmitter.removeAllListeners('onReceive');
    };
  }, []);

  const handleUpdatePrice = async () => {
    if (productId && newPrice) {
      try {
        const response = await axios.post('http://localhost:8000/api/products/update-price', {
          id: productId,
          newPrice: parseFloat(newPrice),
        });

        if (response.status === 200) {
          Alert.alert(`Ürün ID'si ${productId} olan ürünün yeni fiyatı ${newPrice} TL olarak güncellendi`);
          console.log(`API yanıtı: ${response.data}`);
        } else {
          Alert.alert('Yeni fiyat güncellenemedi, lütfen tekrar deneyin');
          console.log(`API hatası: ${response.status}`);
        }
      } catch (error) {
        console.error('Fiyat güncelleme hatası:', error);
        Alert.alert('Fiyat güncelleme sırasında bir hata oluştu');
      }
      setProductId('');
      setNewPrice('');
    } else {
      Alert.alert('Lütfen ürün ID ve yeni fiyatı girin');
      console.log('Ürün ID veya yeni fiyat girilmedi');
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log(`Barkod ile taranan ürün ID: ${data}`);
    setScanning(false);
    setProductId(data);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label="Ürün ID"
          value={productId}
          onChangeText={text => setProductId(text)}
          style={styles.input}
        />
        <TextInput
          label="Yeni Fiyat"
          value={newPrice}
          onChangeText={text => setNewPrice(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button mode="contained" style={styles.button} onPress={handleUpdatePrice}>
          Yeni Fiyatı Güncelle
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => setScanning(true)}>
          Barkod Tara
        </Button>
        {scanning && (
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarCodeScanned}
            captureAudio={false}
          />
        )}
      </View>
    </PaperProvider>
  );
};

// Stil dosyaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdatePriceScreen;
