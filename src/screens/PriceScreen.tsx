import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Card, Title, Paragraph, Provider as PaperProvider, Button } from 'react-native-paper';
import axios from 'axios';
import { RNCamera } from 'react-native-camera';
import { DeviceEventEmitter } from 'react-native';

interface PriceItem {
  _id: string;
  name: string;
  price: number;
  newPrice: number;  
}

const PriceScreen = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [productId, setProductId] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleIntent = (intent: any) => {
      if (intent.action === 'com.zebra.reactnative.ACTION') {
        const scannedData = intent.extras['com.symbol.datawedge.data_string'];
        console.log(`Barkod tarandı: ${scannedData}`);
        setProductId(scannedData);
        searchPrice(scannedData);
      }
    };

    DeviceEventEmitter.addListener('onReceive', handleIntent);

    return () => {
      DeviceEventEmitter.removeAllListeners('onReceive');
    };
  }, []);

  const searchPrice = async (id: string) => {
    if (!id) {
      Alert.alert('Uyarı', 'Lütfen bir ürün kodu giriniz');
      console.log('Kullanıcı ürün kodu girmedi.');
      return;
    }

    try {
      setLoading(true);
      console.log(`Ürün kodu sorgulanıyor: ${id}`);

      // Gerçek API çağrısı
      const response = await axios.get(`http://localhost:8000/api/products/search`, {
        params: { id },
      });

      if (response.data.length === 0) {
        Alert.alert('Hata', 'Ürün kodu hatalıdır');
        console.log(`Ürün kodu hatalı: ${id}`);
      } else {
        setPrices(response.data);
        console.log(`API sorgulama sonucu: ${JSON.stringify(response.data)}`);
        Alert.alert('Başarılı', 'Ürün bulundu');
        console.log(`Ürün bulundu: ${id}`);
      }
    } catch (error) {
      console.error('Fiyat sorgulama hatası:', error);
      Alert.alert('Hata', 'Fiyat sorgulama hatası');
    } finally {
      setLoading(false);
      console.log('Sorgulama tamamlandı.');
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log(`Barkod ile taranan ürün kodu: ${data}`);
    setScanning(false);
    setProductId(data);
    searchPrice(data);
  };

  const renderItem = ({ item }: { item: PriceItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Eski Fiyat: {item.price} TL</Paragraph>
        <Paragraph>Yeni Fiyat: {item.newPrice} TL</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ürün kodu giriniz"
          value={productId}
          onChangeText={setProductId}
        />
        <Button 
          mode="contained" 
          onPress={() => searchPrice(productId)} 
          style={styles.button}
        >
          Sorgula
        </Button>
        <Button 
          mode="contained" 
          onPress={() => setScanning(true)} 
          style={styles.button}
        >
          Barkod Tara
        </Button>
        {scanning && (
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarCodeScanned}
            captureAudio={false}
          />
        )}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={prices}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  button: {
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginVertical: 8,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PriceScreen;
