// src/screens/FinanceScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, Card, List } from 'react-native-paper';
import { getIncomeAndExpenses, getInvoicesAndPayments, getBudget } from '../api/finance';

const FinanceScreen: React.FC = () => {
  const [incomeExpenses, setIncomeExpenses] = useState<any[]>([]);
  const [invoicesPayments, setInvoicesPayments] = useState<any[]>([]);
  const [budget, setBudget] = useState<any>(null);

  const handleGetIncomeAndExpenses = async () => {
    try {
      const data = await getIncomeAndExpenses();
      setIncomeExpenses(data);
    } catch (error) {
      Alert.alert('Hata', 'Gelir ve giderler getirilemedi');
    }
  };

  const handleGetInvoicesAndPayments = async () => {
    try {
      const data = await getInvoicesAndPayments();
      setInvoicesPayments(data);
    } catch (error) {
      Alert.alert('Hata', 'Faturalar ve ödemeler getirilemedi');
    }
  };

  const handleGetBudget = async () => {
    try {
      const data = await getBudget();
      setBudget(data);
    } catch (error) {
      Alert.alert('Hata', 'Bütçe bilgileri getirilemedi');
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Button mode="contained" style={styles.button} onPress={handleGetIncomeAndExpenses}>
            Gelir ve Giderleri Görüntüle
          </Button>
          {incomeExpenses.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Gelir ve Giderler" />
              <Card.Content>
                {incomeExpenses.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.type}
                    description={`${item.amount}, ${item.description}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
          <Button mode="contained" style={styles.button} onPress={handleGetInvoicesAndPayments}>
            Faturaları ve Ödemeleri Görüntüle
          </Button>
          {invoicesPayments.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Faturalar ve Ödemeler" />
              <Card.Content>
                {invoicesPayments.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item.type}
                    description={`${item.amount}, Durum: ${item.status}`}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
          <Button mode="contained" style={styles.button} onPress={handleGetBudget}>
            Bütçeyi Görüntüle
          </Button>
          {budget && (
            <Card style={styles.card}>
              <Card.Title title="Bütçe" />
              <Card.Content>
                <Text>Toplam Bütçe: {budget.totalBudget}</Text>
                <Text>Harcanan: {budget.spent}</Text>
                <Text>Kalan: {budget.remaining}</Text>
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

export default FinanceScreen;
