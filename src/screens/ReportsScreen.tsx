import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, Card, List, Text, RadioButton } from 'react-native-paper';
import { getReportData } from '../api/reports';

const ReportsScreen: React.FC = () => {
  const [reportType, setReportType] = useState<string>('sales');
  const [reportData, setReportData] = useState<any[]>([]);

  const fetchReportData = async (type: string) => {
    try {
      const data = await getReportData(type);
      setReportData(data);
    } catch (error) {
      Alert.alert('Hata', 'Rapor verisi getirilemedi');
    }
  };

  useEffect(() => {
    fetchReportData(reportType);
  }, [reportType]);

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <RadioButton.Group onValueChange={value => setReportType(value)} value={reportType}>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="sales" />
              <Text>Satış Raporları</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="inventory" />
              <Text>Envanter Raporları</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="finance" />
              <Text>Finans Raporları</Text>
            </View>
          </RadioButton.Group>
          <Card style={styles.card}>
            <Card.Title title="Rapor Verileri" />
            <Card.Content>
              {reportData.length > 0 ? (
                reportData.map((item, index) => (
                  <List.Item
                    key={index}
                    title={reportType === 'sales' ? `Tarih: ${item.date}, Tutar: ${item.amount}` :
                          reportType === 'inventory' ? `Ürün: ${item.item}, Stok: ${item.stock}` :
                          `Tip: ${item.type}, Tutar: ${item.amount}`}
                  />
                ))
              ) : (
                <Text>Veri yok</Text>
              )}
            </Card.Content>
          </Card>
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    width: '100%',
    marginVertical: 10,
  },
});

export default ReportsScreen;
