// src/screens/PurchasingScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card, List } from 'react-native-paper';
import { createOrder, getSuppliers, getPricingAndDiscounts } from '../api/purchasing';

const PurchasingScreen: React.FC = () => {
  const [orderData, setOrderData] = useState<any>({});
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [pricingDiscounts, setPricingDiscounts] = useState<any[]>([]);

  const handleCreateOrder = async () => {
    try {
      const response = await createOrder(orderData);
      Alert.alert('Başarılı', response.message);
    } catch (error) {
      Alert.alert('Hata', 'Sipariş işlemi gerçekleştirilemedi');
    }
  };

  const handleGetSuppliers = async () => {
    try {
      const supplierList = await getSuppliers();
      setSuppliers(supplierList);
    } catch (error) {
      Alert.alert('Hata', 'Tedarikçiler getirilemedi');
    }
  };

  const handleGetPricingAndDiscounts = async () => {
    try {
      const pricingList = await getPricingAndDiscounts();
      setPricingDiscounts(pricingList);
    } catch (error) {
      Alert.alert('Hata', 'Fiyatlar ve iskontolar getirilemedi');
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TextInput
            label="Tedarikçi ID"
            value={orderData.supplierId}
            onChangeText={text => setOrderData({ ...orderData, supplierId: text })}
            style={styles.input}
          />
          <TextInput
            label="Ürün ID"
            value={orderData.productId}
            onChangeText={text => setOrderData({ ...orderData, productId: text })}
            style={styles.input}
          />
          <TextInput
            label="Miktar"
            value={orderData.quantity}
            onChangeText={text => setOrderData({ ...orderData, quantity: Number(text) })}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" style={styles.button} onPress={handleCreateOrder}>
            Sipariş Oluştur
          </Button>
          <Button mode="contained" style={styles.button} onPress={handleGetSuppliers}>
            Tedarikçileri Görüntüle
          </Button>
          {suppliers.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Tedarikçiler" />
              <Card.Content>
                {suppliers.map((supplier, index) => (
                  <List.Item
                    key={index}
                    title={supplier.name}
                    description={`Performans: ${supplier.performance}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
          <Button mode="contained" style={styles.button} onPress={handleGetPricingAndDiscounts}>
            Fiyat ve İskontoları Görüntüle
          </Button>
          {pricingDiscounts.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Fiyat ve İskontolar" />
              <Card.Content>
                {pricingDiscounts.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.product}
                    description={`Fiyat: ${item.price}, İskonto: ${item.discount}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  input: {
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    width: '80%',
  },
  card: {
    width: '100%',
    marginVertical: 10,
  },
});

export default PurchasingScreen;
