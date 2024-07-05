// src/screens/SalesScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card, List } from 'react-native-paper';
import { createSale, getPromotions, getCustomerInfo } from '../api/sales';

const SalesScreen: React.FC = () => {
  const [saleData, setSaleData] = useState<any>({});
  const [promotions, setPromotions] = useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState<any>(null);

  const handleCreateSale = async () => {
    try {
      const response = await createSale(saleData);
      Alert.alert('Başarılı', response.message);
    } catch (error) {
      Alert.alert('Hata', 'Satış işlemi gerçekleştirilemedi');
    }
  };

  const handleGetPromotions = async () => {
    try {
      const promos = await getPromotions();
      setPromotions(promos);
    } catch (error) {
      Alert.alert('Hata', 'Promosyonlar getirilemedi');
    }
  };

  const handleGetCustomerInfo = async (customerId: string) => {
    try {
      const customer = await getCustomerInfo(customerId);
      setCustomerInfo(customer);
    } catch (error) {
      Alert.alert('Hata', 'Müşteri bilgileri getirilemedi');
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TextInput
            label="Müşteri ID"
            value={saleData.customerId}
            onChangeText={text => setSaleData({ ...saleData, customerId: text })}
            style={styles.input}
          />
          <TextInput
            label="Ürün ID"
            value={saleData.productId}
            onChangeText={text => setSaleData({ ...saleData, productId: text })}
            style={styles.input}
          />
          <TextInput
            label="Miktar"
            value={saleData.quantity}
            onChangeText={text => setSaleData({ ...saleData, quantity: Number(text) })}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" style={styles.button} onPress={handleCreateSale}>
            Satış Oluştur
          </Button>
          <Button mode="contained" style={styles.button} onPress={handleGetPromotions}>
            Promosyonları Görüntüle
          </Button>
          {promotions.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Promosyonlar" />
              <Card.Content>
                {promotions.map((promo, index) => (
                  <List.Item
                    key={index}
                    title={promo.name}
                    description={`İndirim: ${promo.discount}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
          <Button mode="contained" style={styles.button} onPress={() => handleGetCustomerInfo(saleData.customerId)}>
            Müşteri Bilgilerini Görüntüle
          </Button>
          {customerInfo && (
            <Card style={styles.card}>
              <Card.Title title="Müşteri Bilgileri" />
              <Card.Content>
                <Text>Müşteri ID: {customerInfo.customerId}</Text>
                <Text>İsim: {customerInfo.name}</Text>
                <Text>Sadakat Puanı: {customerInfo.loyaltyPoints}</Text>
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

export default SalesScreen;
