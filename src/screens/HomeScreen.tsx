import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: { role: 'admin' | 'store' | 'warehouse' };
  InventoryScreen: undefined;
  PriceScreen: undefined;
  UpdatePriceScreen: undefined;
  TransferScreen: undefined;
  LabelScreen: undefined;
  StockScreen: undefined;
  WarehouseScreen: undefined;
  SalesScreen: undefined;
  PurchasingScreen: undefined;
  FinanceScreen: undefined;
  ProductionScreen: undefined;
  UserManagementScreen: undefined;
  ReportsScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const { role } = route.params;

  const renderButtons = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('InventoryScreen')}>
              Envanter Sorgu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('PriceScreen')}>
              Fiyat Sorgu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('UpdatePriceScreen')}>
              Fiyat Güncelle
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('TransferScreen')}>
              Transferler
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('LabelScreen')}>
              Etiket Bas
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('StockScreen')}>
              Stok Durumu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('WarehouseScreen')}>
              Depo Bilgileri
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('SalesScreen')}>
              Satış Yönetimi
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('PurchasingScreen')}>
              Satın Alma
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('FinanceScreen')}>
              Finans Yönetimi
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('ProductionScreen')}>
              Üretim Yönetimi
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('UserManagementScreen')}>
              Kullanıcı Yönetimi
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('ReportsScreen')}>
              Raporlar
            </Button>
          </>
        );
      case 'store':
        return (
          <>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('InventoryScreen')}>
              Envanter Sorgu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('PriceScreen')}>
              Fiyat Sorgu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('UpdatePriceScreen')}>
              Fiyat Güncelle
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('TransferScreen')}>
              Transferler
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('LabelScreen')}>
              Etiket Bas
            </Button>
          </>
        );
      case 'warehouse':
        return (
          <>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('InventoryScreen')}>
              Envanter Sorgu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('TransferScreen')}>
              Transferler
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('LabelScreen')}>
              Etiket Bas
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('StockScreen')}>
              Stok Durumu
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('WarehouseScreen')}>
              Depo Bilgileri
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.buttonContainer}>
            {renderButtons()}
          </View>
        </ScrollView>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 40,
  },
  buttonContainer: {
    width: 380,
    paddingVertical: 20,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
  },
});

export default HomeScreen;
