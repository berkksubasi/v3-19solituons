import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Card, Title, Paragraph, Provider as PaperProvider, Button } from 'react-native-paper';
import axios from 'axios';
import { RNCamera } from 'react-native-camera';
import { DeviceEventEmitter } from 'react-native';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  stores: string[];
}

const dummyInventoryData: InventoryItem[] = [
  { id: 1, name: 'Ürün 1', quantity: 10, stores: ['Şube 1', 'Şube 2'] },
  { id: 2, name: 'Ürün 2', quantity: 5, stores: ['Şube 2', 'Şube 3'] },
  { id: 3, name: 'Ürün 3', quantity: 8, stores: ['Şube 3', 'Şube 4'] },
  { id: 4, name: 'Ürün 4', quantity: 20, stores: ['Şube 4', 'Merkez Depo'] },
  { id: 5, name: 'Ürün 5', quantity: 15, stores: ['Merkez Depo', 'Şube 5', 'Şube 6', 'Şube 2'] },
  { id: 6, name: 'Ürün 6', quantity: 3, stores: ['Yedek Depo'] },
];

const InventoryScreen = () => {
  const [productCode, setProductCode] = useState<string>('');
  const [searchResult, setSearchResult] = useState<InventoryItem[]>([]);
  const [scanning, setScanning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleIntent = (intent: any) => {
      if (intent.action === 'com.zebra.reactnative.ACTION') {
        const scannedData = intent.extras['com.symbol.datawedge.data_string'];
        console.log(`Barkod tarandı: ${scannedData}`);
        setProductCode(scannedData);
        searchInventory(scannedData);
      }
    };

    DeviceEventEmitter.addListener('onReceive', handleIntent);

    return () => {
      DeviceEventEmitter.removeAllListeners('onReceive');
    };
  }, []);

  const searchInventory = async (code: string) => {
    if (!code) {
      Alert.alert('Uyarı', 'Lütfen bir ürün kodu giriniz');
      console.log('Kullanıcı ürün kodu girmedi.');
      return;
    }

    try {
      setLoading(true);
      console.log(`Ürün kodu sorgulanıyor: ${code}`);

      // Dummy data kullanarak sonuçları güncelle
      const result = dummyInventoryData.filter(item => item.name === code);

      if (result.length === 0) {
        Alert.alert('Hata', 'Ürün kodu hatalıdır');
        console.log(`Ürün kodu hatalı: ${code}`);
      } else if (result[0].stores.length === 0) {
        Alert.alert('Bilgi', 'Ürün mevcut değildir');
        console.log(`Ürün mevcut değil: ${code}`);
      } else {
        console.log(`Ürün bulundu: ${code}`);
      }

      setSearchResult(result);
      console.log(`Sorgulama sonucu: ${JSON.stringify(result)}`);

      // Gerçek API çağrısı
      // const response = await axios.get(`https://your-nebim-api-url.com/inventory`, {
      //   params: { code },
      //   headers: { Authorization: `Bearer your-api-token` },
      // });
      // setSearchResult(response.data);
      // console.log(`API sorgulama sonucu: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Envanter sorgulama hatası:', error);
      Alert.alert('Hata', 'Envanter sorgulama hatası');
    } finally {
      setLoading(false);
      console.log('Sorgulama tamamlandı.');
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log(`Barkod ile taranan ürün kodu: ${data}`);
    setScanning(false);
    setProductCode(data);
    searchInventory(data);
  };

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Adet: {item.quantity}</Paragraph>
        <FlatList
          data={item.stores}
          keyExtractor={(store) => store}
          renderItem={({ item: store }) => <Paragraph>Şube: {store}</Paragraph>}
        />
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ürün kodu giriniz"
          value={productCode}
          onChangeText={setProductCode}
        />
        <Button 
          mode="contained" 
          onPress={() => searchInventory(productCode)} 
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
          data={searchResult}
          keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
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
    width: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InventoryScreen;
