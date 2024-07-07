import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import { DeviceEventEmitter } from 'react-native';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  size: string[];
  color: string[];
  category: string;
}

const LabelScreen: React.FC = () => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleIntent = (intent: any) => {
      if (intent.action === 'com.zebra.reactnative.ACTION') {
        const scannedData = intent.extras['com.symbol.datawedge.data_string'];
        console.log(`Barkod tarandı: ${scannedData}`);
        setBarcodeData(scannedData);
        searchProduct(scannedData);
      }
    };

    DeviceEventEmitter.addListener('onReceive', handleIntent);

    return () => {
      DeviceEventEmitter.removeAllListeners('onReceive');
    };
  }, []);

  const searchProduct = async (code: string) => {
    console.log(`Ürün kodu sorgulanıyor: ${code}`);
    try {
      const response = await axios.get(`http://localhost:8000/api/products/search`, {
        params: { id: code },
      });
      setProduct(response.data[0]); // Assuming the API returns an array
      console.log(`API yanıtı: ${JSON.stringify(response.data[0])}`);
    } catch (error) {
      console.error('Ürün sorgulama hatası:', error);
      Alert.alert('Hata', 'Ürün sorgulama hatası');
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log(`Barkod ile taranan ürün kodu: ${data}`);
    setScanning(false);
    setBarcodeData(data);
    searchProduct(data);
  };

  const handleScanPress = () => {
    setScanning(true);
  };

  const handlePreviewLabel = () => {
    if (product) {
      setPreviewVisible(true);
    } else {
      alert('Lütfen bir ürün seçin');
      console.log('Ürün seçilmedi');
    }
  };

  const handlePrintLabel = () => {
    if (product) {
      alert(`Etiket yazdırılıyor: ${product.name}, Fiyat: ${product.price}, Kategori: ${product.category}, Bedenler: ${product.size?.join(', ')}`);
      console.log(`Etiket yazdırılıyor: ${JSON.stringify(product)}`);
    } else {
      alert('Lütfen bir ürün seçin');
      console.log('Ürün seçilmedi');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label="Barkod veya Ürün Kodu"
          value={barcodeData}
          onChangeText={text => setBarcodeData(text)}
          style={styles.input}
        />
        <Button mode="contained" style={styles.button} onPress={() => searchProduct(barcodeData)}>
          Ürün Sorgula
        </Button>
        <Button mode="contained" style={styles.button} onPress={handleScanPress}>
          Barkod Tara
        </Button>
        {scanning && (
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarCodeScanned}
            captureAudio={false}
          />
        )}
        {product && (
          <Card style={styles.productCard}>
            <Card.Title title="Ürün Bilgisi" />
            <Card.Content>
              <Text>Ürün ID: {product._id}</Text>
              <Text>Ürün Adı: {product.name}</Text>
              <Text>Fiyat: {product.price}</Text>
              <Text>Kategori: {product.category}</Text>
              <Text>Bedenler: {product.size?.join(', ')}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={handlePreviewLabel}>Önizleme</Button>
              <Button mode="contained" onPress={handlePrintLabel}>Etiketi Yazdır</Button>
            </Card.Actions>
          </Card>
        )}
        {previewVisible && product && (
          <Card style={styles.previewCard}>
            <Card.Title title="Etiket Önizleme" />
            <Card.Content>
              <Text>Ürün: {product.name}</Text>
              <Text>Fiyat: {product.price}</Text>
              <Text>Kategori: {product.category}</Text>
              <Text>Bedenler: {product.size?.join(', ')}</Text>
              <Text>Ürün ID: {product._id}</Text>
            </Card.Content>
          </Card>
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
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    marginTop: 20,
    padding: 10,
  },
  previewCard: {
    marginTop: 20,
    padding: 10,
  },
});

export default LabelScreen;
