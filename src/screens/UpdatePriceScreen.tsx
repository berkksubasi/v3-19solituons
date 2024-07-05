import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Button, TextInput } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import { DeviceEventEmitter } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: string;
}

const dummyProductData: Product[] = [
  { id: '1', name: 'Ürün 1', price: '10 TL' },
  { id: '2', name: 'Ürün 2', price: '20 TL' },
  { id: '3', name: 'Ürün 3', price: '30 TL' },
];

const UpdatePriceScreen = () => {
  const [productName, setProductId] = useState('');
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
    if (productName && newPrice) {
      // Dummy data güncelleme
      const productIndex = dummyProductData.findIndex(product => product.name === productName);
      if (productIndex !== -1) {
        dummyProductData[productIndex].price = `${newPrice} TL`;
        alert(`Ürün Kodu ${productName} olan ürünün fiyatı ${newPrice} TL olarak güncellendi`);
        console.log(`Ürün Kodu ${productName} olan ürünün fiyatı ${newPrice} TL olarak güncellendi`);

        // Gerçek API çağrısı
        // try {
        //   const response = await axios.post('https://your-nebim-api-url.com/update-price', {
        //     productId,
        //     newPrice,
        //   }, {
        //     headers: { Authorization: `Bearer your-api-token` },
        //   });

        //   if (response.status === 200) {
        //     alert(`Ürün ID'si ${productId} olan ürünün fiyatı ${newPrice} TL olarak güncellendi`);
        //     console.log(`API yanıtı: ${response.data}`);
        //   } else {
        //     alert('Fiyat güncellenemedi, lütfen tekrar deneyin');
        //     console.log(`API hatası: ${response.status}`);
        //   }
        // } catch (error) {
        //   console.error('Fiyat güncelleme hatası:', error);
        //   alert('Fiyat güncelleme sırasında bir hata oluştu');
        // }
      } else {
        alert('Ürün bulunamadı');
        console.log('Ürün bulunamadı');
      }
      setProductId('');
      setNewPrice('');
    } else {
      alert('Lütfen ürün ID ve yeni fiyatı girin');
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
          value={productName}
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
          Fiyatı Güncelle
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
