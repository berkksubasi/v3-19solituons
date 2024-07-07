import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, Card, List } from 'react-native-paper';
import { getProductionPlans, getMaterialRequirements, getQualityControlReports } from '../api/production';

const ProductionScreen: React.FC = () => {
  const [productionPlans, setProductionPlans] = useState<any[]>([]);
  const [materialRequirements, setMaterialRequirements] = useState<any[]>([]);
  const [qualityControlReports, setQualityControlReports] = useState<any[]>([]);

  const handleGetProductionPlans = async () => {
    try {
      const data = await getProductionPlans();
      setProductionPlans(data);
    } catch (error) {
      Alert.alert('Hata', 'Üretim planları getirilemedi');
    }
  };

  const handleGetMaterialRequirements = async () => {
    try {
      const data = await getMaterialRequirements();
      setMaterialRequirements(data);
    } catch (error) {
      Alert.alert('Hata', 'Malzeme ihtiyaçları getirilemedi');
    }
  };

  const handleGetQualityControlReports = async () => {
    try {
      const data = await getQualityControlReports();
      setQualityControlReports(data);
    } catch (error) {
      Alert.alert('Hata', 'Kalite kontrol raporları getirilemedi');
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Button mode="contained" style={styles.button} onPress={handleGetProductionPlans}>
            Üretim Planlarını Görüntüle
          </Button>
          {productionPlans.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Üretim Planları" />
              <Card.Content>
                {productionPlans.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.name}
                    description={`Durum: ${item.status}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
          <Button mode="contained" style={styles.button} onPress={handleGetMaterialRequirements}>
            Malzeme İhtiyaçlarını Görüntüle
          </Button>
          {materialRequirements.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Malzeme İhtiyaçları" />
              <Card.Content>
                {materialRequirements.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.material}
                    description={`Miktar: ${item.quantity}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
          <Button mode="contained" style={styles.button} onPress={handleGetQualityControlReports}>
            Kalite Kontrol Raporlarını Görüntüle
          </Button>
          {qualityControlReports.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Kalite Kontrol Raporları" />
              <Card.Content>
                {qualityControlReports.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.product}
                    description={`Sonuç: ${item.result}`}
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

export default ProductionScreen;
