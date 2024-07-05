// src/screens/WarehouseScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card, List } from 'react-native-paper';
import { getWarehouseInfo, getWarehouseInventory } from '../api/warehouse';

const WarehouseScreen: React.FC = () => {
  const [warehouseId, setWarehouseId] = useState('');
  const [warehouseInfo, setWarehouseInfo] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);

  const handleCheckWarehouse = async () => {
    try {
      const info = await getWarehouseInfo(warehouseId);
      setWarehouseInfo(info);
      const inv = await getWarehouseInventory(warehouseId);
      setInventory(inv);
    } catch (error) {
      Alert.alert('Hata', 'Depo bilgileri sorgulanamadı');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label="Depo ID"
          value={warehouseId}
          onChangeText={text => setWarehouseId(text)}
          style={styles.input}
        />
        <Button mode="contained" style={styles.button} onPress={handleCheckWarehouse}>
          Depo Bilgilerini Kontrol Et
        </Button>
        {warehouseInfo && (
          <Card style={styles.card}>
            <Card.Title title="Depo Bilgileri" />
            <Card.Content>
              <Text>Depo ID: {warehouseInfo.warehouseId}</Text>
              <Text>Lokasyon: {warehouseInfo.location}</Text>
              <Text>Kapasite: {warehouseInfo.capacity}</Text>
              <Text>Mevcut Stok: {warehouseInfo.currentStock}</Text>
            </Card.Content>
          </Card>
        )}
        {inventory.length > 0 && (
          <Card style={styles.card}>
            <Card.Title title="Depo Envanteri" />
            <Card.Content>
              {inventory.map((item, index) => (
                <List.Item
                  key={index}
                  title={item.name}
                  description={`Miktar: ${item.quantity}`}
                />
              ))}
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

export default WarehouseScreen;
