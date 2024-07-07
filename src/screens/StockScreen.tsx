import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card, List } from 'react-native-paper';
import { getStockStatus } from '../api/inventory';

const StockScreen: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [stockStatus, setStockStatus] = useState<any>(null);

  const handleCheckStock = async () => {
    try {
      const status = await getStockStatus(productId);
      setStockStatus(status);
    } catch (error) {
      Alert.alert('Hata', 'Stok durumu sorgulanamadı');
    }
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
        <Button mode="contained" style={styles.button} onPress={handleCheckStock}>
          Stok Durumunu Kontrol Et
        </Button>
        {stockStatus && (
          <Card style={styles.card}>
            <Card.Title title="Stok Durumu" />
            <Card.Content>
              <Text>Ürün ID: {stockStatus.productId}</Text>
              <Text>Miktar: {stockStatus.quantity}</Text>
              <Text>Depo Konumu: {stockStatus.warehouseLocation}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </PaperProvider>
  );
};

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
  card: {
    marginVertical: 10,
  },
});

export default StockScreen;
